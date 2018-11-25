"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var Server = /** @class */ (function () {
    function Server(port) {
        var _this = this;
        this.clientHandlers = [];
        this.boards = [];
        this.purgeConnections = function () {
            var purge = [];
            var thisserver = _this;
            _this.clientHandlers.forEach(function (client) {
                if (!client.isAlive()) {
                    purge.push(client);
                    console.log("Client " + client.getIP() + " disconnected!");
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
        this.sockio = new SocketIO(port);
        //Handle connection
        this.sockio.on('connection', function (sio) {
            var client = new ClientHandler_1.ClientHandler(sio);
            console.log("New connection from " + client.getIP());
            thisserver.clientHandlers.push(client);
        });
        //Initialize server ticking
        setInterval(this.tick, 1000);
        console.log("Server listening on port " + port);
    }
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map