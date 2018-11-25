"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var Server = /** @class */ (function () {
    function Server(port) {
        var _this = this;
        this.list = [];
        this.tick = function () {
            _this.purge();
        };
        var thisserver = this;
        console.log("Server initializing...");
        this.sockio = new SocketIO(port);
        this.sockio.on('connection', function (sio) {
            var client = new ClientHandler_1.ClientHandler(sio);
            console.log("New connection from " + client.getIP());
            thisserver.list.push(client);
        });
        console.log("Server listening on port " + port);
    }
    Server.prototype.purge = function () {
        var purge = [];
        var thisserver = this;
        this.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("ClientHandler " + client.getIP() + " disconnected!");
                return;
            }
        });
        purge.forEach(function (client) {
            var index = thisserver.list.indexOf(client);
            thisserver.list.splice(index, 1);
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map