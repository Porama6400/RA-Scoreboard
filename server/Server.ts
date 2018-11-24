import * as SocketIO from "socket.io";
import {ScoreboardServer} from "./ScoreboardServer";

let socket: SocketIO = new SocketIO(443);
let server: ScoreboardServer = new ScoreboardServer(socket);


//Set server ticking
setInterval(server.tick, 500);