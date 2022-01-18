"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var fs = require("fs");
var socket_io_1 = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var Packets_1 = require("./Packets");
var https_1 = require("https");
var Server = /** @class */ (function () {
    function Server(port, privkeypath, certpath) {
        var _this = this;
        this.clientHandlers = [];
        this.removeClient = function (client) {
            if (client.sio.connected) {
                client.sio.disconnect(0);
            }
            var index = _this.clientHandlers.indexOf(client);
            _this.clientHandlers.splice(index, 1);
            _this.broadcastConnectionUpdate(client, Packets_1.NetworkUpdateType.LEAVE);
            console.log("Client " + client.id + " at " + client.getIP() + " disconnected!");
        };
        this.purgeConnections = function () {
            var purge = [];
            var thisserver = _this;
            _this.clientHandlers.forEach(function (client) {
                if (!client.isAlive() || client.pingIntegrity <= 0) {
                    purge.push(client);
                    return;
                }
            });
            purge.forEach(function (client) {
                thisserver.removeClient(client);
            });
        };
        this.onConnection = function (conn) {
            var client = new ClientHandler_1.ClientHandler(_this, conn);
            console.log("New connection from " + client.getIP() + " as client " + client.id);
            _this.clientHandlers.push(client);
            // Send welcome packet
            var packetWelcome = new Packets_1.PacketScoreboardRegistry();
            packetWelcome.req = Packets_1.PacketScoreboardRegistry.Type.WELCOME;
            packetWelcome.payload = { id: client.id };
            client.send(Packets_1.Packet.Channels.Registry, packetWelcome);
            client.sio.on('disconnect', function () {
                _this.removeClient(client);
            });
        };
        console.log("Server initializing...");
        //Initialize Socket.io
        if (certpath === null || certpath === undefined || privkeypath === null || privkeypath === undefined) {
            this.socketServer = new socket_io_1.Server(port);
        }
        else {
            var server = https_1.createServer({
                key: fs.readFileSync(privkeypath),
                cert: fs.readFileSync(certpath)
            });
            this.socketServer = new socket_io_1.Server(server, {
                cors: {
                    origin: "*"
                }
            });
            server.listen(port);
        }
        //Handle connection
        this.socketServer.on('connection', this.onConnection);
        //Initialize server ticking
        setInterval(this.purgeConnections, 60000);
        console.log("Server listening on port " + port);
    }
    ;
    Server.prototype.getConnectionSummary = function (accessKey) {
        var dataout = {};
        this.clientHandlers.forEach(function (client) {
            if (client.boardinfo.accessKey === accessKey) {
                dataout[client.id] = client.getSummary();
            }
        });
        return dataout;
    };
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
    Server.prototype.broadcastConnectionUpdate = function (triggerClient, eventType) {
        this.clientHandlers.forEach(function (client) {
            if (client.sio.connected
                && client !== triggerClient
                && client.boardinfo.accessKey === triggerClient.boardinfo.accessKey) {
                var packetOut = new Packets_1.PacketScoreboardRegistry();
                packetOut.req = Packets_1.PacketScoreboardRegistry.Type.NETWORK_UPDATE;
                packetOut.payload = {
                    type: eventType,
                    client: triggerClient.getSummary()
                };
                client.send(Packets_1.Packet.Channels.Registry, packetOut);
            }
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map