import * as SocketIO from "socket.io";
import {Client} from "./clienthandler/Client";

export class Server {

    public list: Array<Client> = [];

    constructor(sockio: SocketIO) {
        const thisclaz = this;

        sockio.on('connection', function (sio) {
            let client: Client = new Client(sio);

            console.log("New connection from " + client.ip());
            thisclaz.list.push(client);
        });
    }


    public purge(): void {
        let purge: Array<Client> = [];
        const thisclz = this;

        this.list.forEach(function (client) {
            if (!client.isAlive()) {
                purge.push(client);
                console.log("Client " + client.ip() + " disconnected!");
                return;
            }
        });

        purge.forEach(function (client) {
            let index: number = thisclz.list.indexOf(client);
            thisclz.list.splice(index, 1);
        })
    }

    public tick = (): void => {
        this.purge();
    }
}
