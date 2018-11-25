"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var Server = /** @class */ (function () {
    function Server(port) {
        var _this = this;
        this.clientHandlers = [];
        this.boards = [];
        this.onConnection = function (conn) {
            var client = new ClientHandler_1.ClientHandler(conn);
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
        this.sockio = new SocketIO(port);
        //Handle connection
        this.sockio.on('connection', this.onConnection);
        /*
        this.sockio.on('connection', function (sio) {
            let client: ClientHandler = new ClientHandler(sio);

            console.log("New connection from " + client.getIP());
            thisserver.clientHandlers.push(client);
        });
        */
        //Initialize server ticking
        setInterval(this.tick, 1000);
        console.log("Server listening on port " + port);
    }
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map