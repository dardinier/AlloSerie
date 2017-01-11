const child_process = require('child_process');
const path = require('path');
const sys = require("util");
const fs = require('fs');

const port = 4598;

const pathData = path.join(__dirname, 'server/data');

fs.mkdir(pathData);

const server = child_process.spawn(
    'node',
    [path.join(__dirname, '../src/server/index.js')],
    {env: {PORT: port, DATA: pathData}}
);

server.stdout.addListener('data', function (data) {
    sys.print('SERVER : '+data);
});

server.stderr.addListener('data', function (data) {
    sys.print('SERVER : '+data);
});

setTimeout(function() {
    const test = child_process.exec('SERVER_PORT='+port+' node '+path.join(__dirname, '../node_modules/.bin/jasmine-node')+' --verbose '+path.join(__dirname, 'server'));

    test.stdout.on('data', function(data) {
        console.log(data);
    });
    test.stderr.on('data', function(data) {
        console.log(data);
    });

    test.on('close', function(code) {
        server.kill();
    });

}, 500);
