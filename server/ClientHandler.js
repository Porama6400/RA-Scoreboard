"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Packets_1 = require("./Packets");
var Utils_1 = require("./Utils");
var ClientHandler = /** @class */ (function () {
    function ClientHandler(sio) {
        var _this = this;
        this.sio = sio;
        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on("sbr", function (packet) {
            if (packet.req === Packets_1.Packet.REGISTER) {
                if (_this.boardAccessKey == undefined)
                    _this.boardAccessKey = Utils_1.Utils.generateID();
                console.log("Client at " + _this.getIP() + " announced as a scoreboard. ID: " + _this.boardAccessKey);
            }
        });
    }
    ClientHandler.prototype.isAlive = function () {
        return this.sio.connected;
    };
    ClientHandler.prototype.getIP = function () {
        return this.sio.handshake.address;
    };
    return ClientHandler;
}());
exports.ClientHandler = ClientHandler;
//# sourceMappingURL=ClientHandler.js.map