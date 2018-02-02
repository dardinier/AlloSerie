const fs = require('fs');
const path = require('path');
const config = require('./config');

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(config.data, filePath), "utf8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
};

const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(config.data, "episode." + data.id + ".json"), JSON.stringify(data), "utf8", (error) => {
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
        fs.unlink(path.join(config.data, filePath), (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(config.data, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(Promise.all(files.map((file) => {
                return readFile(file);
            })));
        });
    });
};

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        fs.readdir(config.data, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(readFile(files.filter(file => file === "episode." + id + ".json")[0]));
        });
    });
};

exports.insert = (data) => {
    return new Promise((resolve, reject) => {
        writeFile(data).then((data) => {
            resolve(data);
        })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        fs.readdir(config.data, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(deleteFile(files.filter(file => file === "episode." + id + ".json")[0]));
        });
    });
};
