import * as fs from "fs";
import * as https from "https";
import * as express from "express";
import * as SocketIO from "socket.io";
import {ClientHandler, ClientType} from "./ClientHandler";

const app = express();

export class Server {

    public clientHandlers: Array<ClientHandler> = [];

    public sockio: SocketIO;

    constructor(port: number, privkeypath: string, certpath: string) {
        const thisserver = this;
        console.log("Server initializing...");

        //Initialize Socket.io
        if (certpath === null || certpath === undefined || privkeypath === null || certpath === undefined) {
            this.sockio = new SocketIO(port);
        }
        else {
            var server = https.createServer({
                key: fs.readFileSync(privkeypath),
                cert: fs.readFileSync(certpath)
            }, app);
            server.listen(port);
            this.sockio = SocketIO.listen(server);
        }

        //Handle connection
        this.sockio.on('connection', this.onConnection);

        //Initialize server ticking
        setInterval(this.tick, 1000);

        console.log("Server listening on port " + port);
    };

    private onConnection = (conn: SocketIO) => {
        let client: ClientHandler = new ClientHandler(this, conn);
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
    };

    public tick = (): void => {
        this.purgeConnections();
    };

    public getBoardClient(key: string) {
        var ret: any = null;
        this.clientHandlers.forEach((client) => {
            if (client.type == ClientType.SCOREBOARD) {
                if (client.boardinfo.accessKey === key) ret = client;
            }
        });
        return ret;
    }
}
