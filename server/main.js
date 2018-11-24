"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var Server_1 = require("./Server");
var socket = new SocketIO(443);
var server = new Server_1.Server(socket);
//Set server ticking
setInterval(server.tick, 500);
//# sourceMappingURL=main.js.map