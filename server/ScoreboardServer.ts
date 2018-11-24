import * as SocketIO from "socket.io";
import {Client} from "./Client";

export class ScoreboardServer {

    public static list: Array<Client> = [];

    constructor(sockio: SocketIO) {

        // @ts-ignore
        sockio.on('connection', function (sio) {
            ScoreboardServer.list.push(new Client(sio));
        });
    }


    tick(): void {
        console.log("Testx");
    }
}
