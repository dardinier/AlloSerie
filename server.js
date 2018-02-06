var chokidar = require('chokidar');
var child_process = require('child_process');
var sys = require("util");

var server = {
    process: null,
    restarting: false,
    start: function() {
        console.log('Starting server');

        var that = this;

        this.process = child_process.spawn('node', ['src/server/index.js']);

        this.process.stdout.addListener('data', function (data) {
            process.stdout.write(data);
        });
        this.process.stderr.addListener('data', function (data) {
            sys.print(data);
        });
        
        this.process.addListener('exit', function (code) {
            console.log('Child process exited: ' + code);
            this.process = null;
            if (that.restarting) {
                that.restarting = false;
                that.start();
            }
        });

    },
    watch: function() {
        var watcher = chokidar.watch('src/server', {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            ignoreInitial: true
        });
        this.start();
        var that = this;
        watcher
            .on('add', function(path) { that.restart(path); })
            .on('change', function(path) { that.restart(path); })
            .on('unlink', function(path) { that.restart(path); });

        const port = 4000;
        const webpack = require('webpack');
        const WebpackDevServer = require('webpack-dev-server');
        const config = require('./webpack.config');

        new WebpackDevServer(webpack(config), {
            hot: true,
            historyApiFallback: true,
            publicPath: '/',
            proxy: {
                '/api/episodes': {
                    target: 'http://localhost:3000',
                }
            }
        }).listen(port, 'localhost', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`Development server running at http://localhost:${port}`);
        });
    },
    restart: function(path) {
        if (path.match('\.js$')) {
            this.restarting = true;
            console.log('Stopping server for restart');
            this.process.kill();
        }
    }
};

if ('dev' === process.env.NODE_ENV) {
    server.watch();
}

if ('production' === process.env.NODE_ENV) {
    server.start();
}
