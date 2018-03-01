const fs = require('fs');
const path = require('path');
const config = require('./config');


/* Internal functions */
const readFile = (filePath) => {
    console.log("Reading : ", filePath);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
};

const writeFile = (data, filePath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        });
    });
};

const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

/* Exposed functions */
exports.findAll = (type) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(config.data, type), (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(Promise.all(files.filter((file) => file !== '.gitkeep').map((file) => {
                return readFile(path.join(config.data, type, file));
            })));
        });
    });
};

exports.findOne = (id, type) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(config.data, type), (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(readFile(path.join(config.data, type, files.filter(file => file === type + "." + id + ".json")[0])));
        });
    });
};

exports.insert = (data, type) => {
    return new Promise((resolve, reject) => {
        writeFile(data, path.join(config.data, type, type + "." + data.id + ".json")).then((data) => {
            resolve(data);
        })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.delete = (id, type) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(config.data, type), (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(deleteFile(path.join(config.data, type, files.filter(file => file === type + "." + id + ".json")[0])));
        });
    });
};
