"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var https = require("https");
var express = require("express");
var SocketIO = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var app = express();
var Server = /** @class */ (function () {
    function Server(port, privkeypath, certpath) {
        var _this = this;
        this.clientHandlers = [];
        this.onConnection = function (conn) {
            var client = new ClientHandler_1.ClientHandler(_this, conn);
            console.log("New connection from " + client.getIP());
            _this.clientHandlers.push(client);
            client.sio.on('management', function (data) {
                console.log(data);
            });
        };
        this.purgeConnections = function () {
            var purge = [];
            var thisserver = _this;
            _this.clientHandlers.forEach(function (client) {
                if (!client.isAlive()) {
                    purge.push(client);
                    console.log("Client at " + client.getIP() + " disconnected!");
                    return;
                }
            });
            purge.forEach(function (client) {
                var index = thisserver.clientHandlers.indexOf(client);
                thisserver.clientHandlers.splice(index, 1);
            });
        };
        this.tick = function () {
            _this.purgeConnections();
        };
        var thisserver = this;
        console.log("Server initializing...");
        //Initialize Socket.io
        if (certpath === null || certpath === undefined || privkeypath === null || certpath === undefined) {
            this.sockio = new SocketIO(port);
        }
        else {
            var server = https.createServer({
                key: fs.readFileSync(privkeypath),
                cert: fs.readFileSync(certpath)
            }, app);
            server.listen(port);
            this.sockio = SocketIO.listen(server);
        }
        //Handle connection
        this.sockio.on('connection', this.onConnection);
        //Initialize server ticking
        setInterval(this.tick, 1000);
        console.log("Server listening on port " + port);
    }
    ;
    Server.prototype.getBoardClient = function (key) {
        var ret = null;
        this.clientHandlers.forEach(function (client) {
            if (client.type == ClientHandler_1.ClientType.SCOREBOARD) {
                if (client.boardinfo.accessKey === key)
                    ret = client;
            }
        });
        return ret;
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map