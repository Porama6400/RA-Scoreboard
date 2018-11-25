import * as SocketIO from "socket.io";
import {ClientHandler} from "./ClientHandler";

export class Server {

    public clientHandlers: Array<ClientHandler> = [];

    public sockio: SocketIO;

    constructor(port: number) {
        const thisserver = this;
        console.log("Server initializing...");

        //Initialize Socket.io
        this.sockio = new SocketIO(port);

        //Handle connection
        this.sockio.on('connection', this.onConnection);

        //Initialize server ticking
        setInterval(this.tick, 1000);

        console.log("Server listening on port " + port);
    }

    private onConnection = (conn: SocketIO) => {
        let client: ClientHandler = new ClientHandler(conn);
        console.log("New connection from " + client.getIP());
        this.clientHandlers.push(client);

        client.sio.on('management', function (data) {
            console.log(data);
        })

    };

    public purgeConnections = (): void => {
        let purge: Array<ClientHandler> = [];
        const thisserver = this;

        this.clientHandlers.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("Client at " + client.getIP() + " disconnected!");
                return;
            }
        });

        purge.forEach(function (client) {
            let index: number = thisserver.clientHandlers.indexOf(client);
            thisserver.clientHandlers.splice(index, 1);
        })
    }

    public tick = (): void => {
        this.purgeConnections();
    }
}
