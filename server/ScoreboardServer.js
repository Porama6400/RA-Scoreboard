"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./Client");
var ScoreboardServer = /** @class */ (function () {
    function ScoreboardServer(sockio) {
        // @ts-ignore
        sockio.on('connection', function (sio) {
            ScoreboardServer.list.push(new Client_1.Client(sio));
        });
    }
    ScoreboardServer.prototype.tick = function () {
        console.log("Testx");
    };
    ScoreboardServer.list = [];
    return ScoreboardServer;
}());
exports.ScoreboardServer = ScoreboardServer;
//# sourceMappingURL=ScoreboardServer.js.map