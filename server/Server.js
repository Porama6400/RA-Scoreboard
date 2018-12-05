"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var https = require("https");
var express = require("express");
var SocketIO = require("socket.io");
var ClientHandler_1 = require("./ClientHandler");
var Packets_1 = require("./Packets");
var app = express();
var Server = /** @class */ (function () {
    function Server(port, privkeypath, certpath) {
        var _this = this;
        this.clientHandlers = [];
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