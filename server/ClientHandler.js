"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientHandler = /** @class */ (function () {
    function ClientHandler(sio) {
        this.sio = sio;
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