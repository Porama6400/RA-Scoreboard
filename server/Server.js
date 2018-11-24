"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./clienthandler/Client");
var Server = /** @class */ (function () {
    function Server(sockio) {
        // @ts-ignore
        sockio.on('connection', function (sio) {
            var client = new Client_1.Client(sio);
            console.log("New connection from " + client.ip());
            Server.list.push(client);
        });
    }
    Server.prototype.tick = function () {
        var purge = [];
        Server.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("Client " + client.ip() + " disconnected!");
                return;
            }
        });
        purge.forEach(function (client) {
            var index = Server.list.indexOf(client);
            Server.list.splice(index, 1);
        });
    };
    Server.list = [];
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map