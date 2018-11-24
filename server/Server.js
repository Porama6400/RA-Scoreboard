"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./clienthandler/Client");
var Server = /** @class */ (function () {
    function Server(sockio) {
        var _this = this;
        this.list = [];
        this.tick = function () {
            _this.purge();
        };
        var thisclaz = this;
        sockio.on('connection', function (sio) {
            var client = new Client_1.Client(sio);
            console.log("New connection from " + client.ip());
            thisclaz.list.push(client);
        });
    }
    Server.prototype.purge = function () {
        var purge = [];
        var thisclz = this;
        this.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("Client " + client.ip() + " disconnected!");
                return;
            }
        });
        purge.forEach(function (client) {
            var index = thisclz.list.indexOf(client);
            thisclz.list.splice(index, 1);
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map