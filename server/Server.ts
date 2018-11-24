import * as SocketIO from "socket.io";
import {Client} from "./clienthandler/Client";

export class Server {

    public static list: Array<Client> = [];

    constructor(sockio: SocketIO) {

        // @ts-ignore
        sockio.on('connection', function (sio) {
            var client: Client = new Client(sio);

            console.log("New connection from " + client.ip());
            Server.list.push(client);
        });
    }


    tick(): void {
        var purge: Array<Client> = [];

        Server.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("Client " + client.sio.ip() + " disconnected!");
                return;
            }
        });

        purge.forEach(function (client) {
            var index: number = Server.list.indexOf(client);
            Server.list.splice(index, 1);
        })

    }
}
