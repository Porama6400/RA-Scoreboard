"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(sio) {
        this.sio = sio;
    }
    Client.prototype.isAlive = function () {
        return this.sio.connected;
    };
    Client.prototype.ip = function () {
        return this.sio.handshake.address;
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map