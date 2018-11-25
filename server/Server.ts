import * as SocketIO from "socket.io";
import {ClientHandler} from "./ClientHandler";

export class Server {

    public list: Array<ClientHandler> = [];

    public sockio: SocketIO;

    constructor(port: number) {
        const thisserver = this;
        console.log("Server initializing...");

        this.sockio = new SocketIO(port);

        this.sockio.on('connection', function (sio) {
            let client: ClientHandler = new ClientHandler(sio);

            console.log("New connection from " + client.getIP());
            thisserver.list.push(client);
        });

        console.log("Server listening on port " + port);
    }


    public purge(): void {
        let purge: Array<ClientHandler> = [];
        const thisserver = this;

        this.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("ClientHandler " + client.getIP() + " disconnected!");
                return;
            }
        });

        purge.forEach(function (client) {
            let index: number = thisserver.list.indexOf(client);
            thisserver.list.splice(index, 1);
        })
    }

    public tick = (): void => {
        this.purge();
    }
}
