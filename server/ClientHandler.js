"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Packets_1 = require("./Packets");
var Utils_1 = require("./Utils");
var BoardInfo_1 = require("./BoardInfo");
var ClientType;
(function (ClientType) {
    ClientType[ClientType["SCOREBOARD"] = 1] = "SCOREBOARD";
    ClientType[ClientType["SCOREBOARD_MIRROR"] = 2] = "SCOREBOARD_MIRROR";
    ClientType[ClientType["SOUND_PLAYER"] = 3] = "SOUND_PLAYER";
    ClientType[ClientType["SYSTEM_MONITOR"] = 4] = "SYSTEM_MONITOR";
    ClientType[ClientType["REMOTE"] = 10] = "REMOTE";
})(ClientType = exports.ClientType || (exports.ClientType = {}));
var ClientHandler = /** @class */ (function () {
    function ClientHandler(server, sio) {
        var _this = this;
        this.type = ClientType.REMOTE;
        this.boardinfo = new BoardInfo_1.BoardInfo();
        this.pingPayload = null;
        this.pingIntegrity = 10;
        this.sio = sio;
        this.server = server;
        this.id = ClientHandler.nextClientID;
        ClientHandler.nextClientID++;
        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on(Packets_1.Packet.Channels.Registry, function (packet) {
            if (packet.req === Packets_1.PacketScoreboardRegistry.Type.REGISTER) {
                if (packet.payload === undefined || packet.payload === null) {
                    _this.boardinfo.accessKey = Utils_1.Utils.generateID();
                }
                else {
                    _this.boardinfo.accessKey = packet.payload;
                }
                console.log("Client " + _this.id + " at " + _this.getIP() + " running as a scoreboard on " + _this.boardinfo.accessKey);
                var packetOut_1 = new Packets_1.PacketScoreboardRegistry();
                packetOut_1.req = Packets_1.PacketScoreboardRegistry.Type.ACKNOWLEDGE;
                packetOut_1.payload = _this.boardinfo.accessKey;
                _this.send(Packets_1.Packet.Channels.Registry, packetOut_1);
                _this.type = ClientType.SCOREBOARD;
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.USE) {
                console.log("Client " + _this.id + " at " + _this.getIP() + " bound to the scoreboard " + packet.payload);
                _this.useScoreboard(packet.payload);
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.MIRROR_REQUEST) {
                _this.type = ClientType.SCOREBOARD_MIRROR;
                _this.useScoreboard(packet.payload);
                console.log("Client" + _this.id + " at " + _this.getIP() + " mirroring the scoreboard " + packet.payload);
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.SOUND_REQUEST) {
                _this.type = ClientType.SOUND_PLAYER;
                _this.useScoreboard(packet.payload);
                console.log("Client " + _this.id + " at " + _this.getIP() + " running as a sound client on " + packet.payload);
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.SYSMONITOR) {
                _this.type = ClientType.SYSTEM_MONITOR;
                _this.useScoreboard(packet.payload);
                console.log("Client " + _this.id + " at " + _this.getIP() + " running as a system monitor on " + packet.payload);
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.NETWORK_LIST) {
                var packetOut = new Packets_1.PacketScoreboardRegistry();
                packetOut.req = Packets_1.PacketScoreboardRegistry.Type.NETWORK_LIST;
                packetOut.payload = _this.server.getConnectionSummary(_this.boardinfo.accessKey);
                _this.send(Packets_1.Packet.Channels.Registry, packetOut);
            }
        });
        this.sio.on(Packets_1.Packet.Channels.Score, function (msg) {
            if (_this.boardinfo.accessKey == null)
                return;
            if (msg.req === Packets_1.PacketScoreboardScore.Type.SOUND) {
                // FORWARD SOUND PACKET TO EVERYONE EXCEPT SENDER
                _this.server.clientHandlers.forEach(function (client) {
                    if (client.sio.connected
                        && client != _this
                        && client.boardinfo.accessKey === _this.boardinfo.accessKey) {
                        client.send(Packets_1.Packet.Channels.Score, msg);
                    }
                });
            }
            else if (_this.type === ClientType.SCOREBOARD) {
                //FORWARD MESSAGES FROM SCOREBOARD TO CLIENT
                _this.server.clientHandlers.forEach(function (client) {
                    if (client.sio.connected
                        && client.type !== ClientType.SCOREBOARD
                        && client.boardinfo.accessKey === _this.boardinfo.accessKey) {
                        client.send(Packets_1.Packet.Channels.Score, msg);
                    }
                });
            }
            else {
                // FORWARD MESSAGE TO SCOREBOARD IF SCOREBOARD ONLINE
                var target = _this.getBoardHolder();
                if (target != null)
                    target.send(Packets_1.Packet.Channels.Score, msg);
            }
        });
    }
    ClientHandler.prototype.getSummary = function () {
        return {
            id: this.id,
            ip: this.getIP(),
            type: this.type,
            typeString: ClientType[this.type].toString()
        };
    };
    ClientHandler.prototype.isAlive = function () {
        return this.sio.connected;
    };
    ClientHandler.prototype.getIP = function () {
        return this.sio.handshake.address;
    };
    ClientHandler.prototype.useScoreboard = function (key) {
        this.boardinfo.accessKey = key;
        this.server.broadcastConnectionUpdate(this, Packets_1.NetworkUpdateType.JOIN);
    };
    ClientHandler.prototype.getBoardHolder = function () {
        // For remote to get scoreboard's client handler
        return this.server.getBoardClient(this.boardinfo.accessKey);
    };
    ClientHandler.prototype.send = function (channel, data) {
        this.sio.emit(channel, data);
    };
    ClientHandler.nextClientID = 1; //What ID will given to next connected client
    return ClientHandler;
}());
exports.ClientHandler = ClientHandler;
//# sourceMappingURL=ClientHandler.js.map