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
    ClientType[ClientType["REMOTE"] = 10] = "REMOTE";
})(ClientType = exports.ClientType || (exports.ClientType = {}));
var ClientHandler = /** @class */ (function () {
    function ClientHandler(server, sio) {
        var _this = this;
        this.type = ClientType.REMOTE;
        this.boardinfo = new BoardInfo_1.BoardInfo();
        this.sio = sio;
        this.server = server;
        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on(Packets_1.Packet.Channels.Registry, function (packet) {
            if (packet.req === Packets_1.PacketScoreboardRegistry.Type.REGISTER) {
                if (packet.payload === undefined || packet.payload === null) {
                    _this.boardinfo.accessKey = Utils_1.Utils.generateID();
                }
                else {
                    _this.boardinfo.accessKey = packet.payload;
                }
                console.log("Client at " + _this.getIP() + " running as a scoreboard on " + _this.boardinfo.accessKey);
                var packetOut = new Packets_1.PacketScoreboardRegistry();
                packetOut.req = Packets_1.PacketScoreboardRegistry.Type.ACKNOWLEDGE;
                packetOut.payload = _this.boardinfo.accessKey;
                _this.sio.emit(Packets_1.Packet.Channels.Registry, packetOut);
                _this.type = ClientType.SCOREBOARD;
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.USE) {
                console.log("Client at " + _this.getIP() + " bound to the scoreboard " + packet.payload);
                _this.useScoreboard(packet.payload);
            }
            else if (packet.req === Packets_1.PacketScoreboardRegistry.Type.MIRROR_REQUEST) {
                _this.type = ClientType.SCOREBOARD_MIRROR;
                _this.boardinfo.accessKey = packet.payload;
                console.log("Client at " + _this.getIP() + " mirroring the scoreboard " + packet.payload);
            }
            else if (packet.req == Packets_1.PacketScoreboardRegistry.Type.SOUND_REQUEST) {
                _this.type = ClientType.SOUND_PLAYER;
                _this.boardinfo.accessKey = packet.payload;
                console.log("Client at " + _this.getIP() + " running as a sound player on " + packet.payload);
            }
        });
        var thisclient = this;
        this.sio.on(Packets_1.Packet.Channels.Score, function (msg) {
            if (thisclient.boardinfo.accessKey == null)
                return;
            if (msg.req === Packets_1.PacketScoreboardScore.Type.SOUND) {
                // FORWARD TO EVERYONE IF IT IS SOUND PACKET (MAY CHANGE LATER)
                thisclient.server.clientHandlers.forEach(function (client) {
                    if (client.sio.connected
                        && client != thisclient
                        && client.boardinfo.accessKey === thisclient.boardinfo.accessKey) {
                        client.sio.emit(Packets_1.Packet.Channels.Score, msg);
                    }
                });
            }
            else if (thisclient.type === ClientType.SCOREBOARD) {
                //FORWARD MESSAGES
                thisclient.server.clientHandlers.forEach(function (client) {
                    if (client.sio.connected
                        && client.type !== ClientType.SCOREBOARD
                        && client.boardinfo.accessKey === thisclient.boardinfo.accessKey) {
                        client.sio.emit(Packets_1.Packet.Channels.Score, msg);
                    }
                });
            }
            else {
                // FORWARD MESSAGE TO SCOREBOARD IF SCOREBOARD ONLINE
                var target = thisclient.getBoardHolder();
                if (target != null)
                    target.sio.emit(Packets_1.Packet.Channels.Score, msg);
            }
        });
    }
    ClientHandler.prototype.isAlive = function () {
        return this.sio.connected;
    };
    ClientHandler.prototype.getIP = function () {
        return this.sio.handshake.address;
    };
    ClientHandler.prototype.useScoreboard = function (key) {
        // For remote to link to scoreboard
        if (this.server.getBoardClient(key) == null)
            return false;
        this.boardinfo.accessKey = key;
        return true;
    };
    ClientHandler.prototype.getBoardHolder = function () {
        // For remote to get scoreboard's client handler
        return this.server.getBoardClient(this.boardinfo.accessKey);
    };
    return ClientHandler;
}());
exports.ClientHandler = ClientHandler;
//# sourceMappingURL=ClientHandler.js.map