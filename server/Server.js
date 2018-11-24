"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var ScoreboardServer_1 = require("./ScoreboardServer");
var socket = new SocketIO(443);
var server = new ScoreboardServer_1.ScoreboardServer(socket);
//Set server ticking
setInterval(server.tick, 500);
//# sourceMappingURL=Server.js.map
