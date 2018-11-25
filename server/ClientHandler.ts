import {Packet, PacketScoreboardRegistry} from "./Packets";
import {Utils} from "./Utils";

export class ClientHandler {
    sio: any; //Socket.io connection
    boardAccessKey: string;

    constructor(sio: any) {
        this.sio = sio;

        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on("sbr", (packet: PacketScoreboardRegistry) => {
            if (packet.req === Packet.REGISTER) {
                if (this.boardAccessKey == undefined) this.boardAccessKey = Utils.generateID();
                console.log("Client at " + this.getIP() + " announced as a scoreboard. ID: " + this.boardAccessKey);
            }
        });
    }

    isAlive(): boolean {
        return this.sio.connected;
    }

    getIP(): any {
        return this.sio.handshake.address;
    }
}