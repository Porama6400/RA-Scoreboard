import * as SocketIO from "socket.io";
import {Server} from "./Server";

let socket: SocketIO = new SocketIO(443);
let server: Server = new Server(socket);


//Set server ticking
setInterval(server.tick, 500);