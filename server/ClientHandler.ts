import {Packet, PacketScoreboardScore, PacketScoreboardRegistry} from "./Packets";
import {Utils} from "./Utils";
import {BoardInfo} from "./BoardInfo";
import {Server} from "./Server";

export enum ClientType {
    SCOREBOARD = 1,
    REMOTE = 2
}

export class ClientHandler {
    server: Server;
    sio: any; //Socket.io connection
    type: ClientType = ClientType.REMOTE;
    boardinfo: BoardInfo = new BoardInfo();

    constructor(server: Server, sio: any) {
        this.sio = sio;
        this.server = server;

        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on(Packet.Channels.Registry, (packet: PacketScoreboardRegistry) => {

            if (packet.req === PacketScoreboardRegistry.Type.REGISTER) {

                if (packet.payload !== undefined) {
                    this.boardinfo.accessKey = packet.payload;
                }
                else if (this.boardinfo.accessKey == undefined) {
                    this.boardinfo.accessKey = Utils.generateID();
                }

                console.log("Client at " + this.getIP() + " announced as a scoreboard - ID: " + this.boardinfo.accessKey);

                let packetOut: PacketScoreboardRegistry = new PacketScoreboardRegistry();
                packetOut.req = PacketScoreboardRegistry.Type.ACKNOWLEDGE;
                packetOut.payload = this.boardinfo.accessKey;
                this.sio.emit(Packet.Channels.Registry, packetOut);
                this.type = ClientType.SCOREBOARD;
            }

            if (packet.req === PacketScoreboardRegistry.Type.USE) {
                console.log("Client at " + this.getIP() + " now bound to scoreboard " + packet.payload)
                this.useScoreboard(packet.payload);
            }
        });

        const thisclient: ClientHandler = this;
        this.sio.on(Packet.Channels.Score, function (msg: PacketScoreboardScore) {
            if (thisclient.boardinfo.accessKey == null) return;

            //FORWARD MESSAGES
            if (thisclient.type === ClientType.REMOTE) {
                thisclient.getBoardHolder().sio.emit(Packet.Channels.Score, msg);
            }
            else if (thisclient.type === ClientType.SCOREBOARD) {
                thisclient.server.clientHandlers.forEach((client) => {
                    if (client.type === ClientType.REMOTE && client.boardinfo.accessKey === thisclient.boardinfo.accessKey) {
                        client.sio.emit(Packet.Channels.Score, msg);
                    }
                })
            }
        });
    }

    isAlive(): boolean {
        return this.sio.connected;
    }

    getIP(): any {
        return this.sio.handshake.address;
    }

    useScoreboard(key: string): boolean {
        // For remote to link to scoreboard

        if (this.server.getBoardClient(key) == null) return false;

        this.boardinfo.accessKey = key;
        return true;
    }

    getBoardHolder() {
        // For remote to get scoreboard's client handler

        return this.server.getBoardClient(this.boardinfo.accessKey);
    }
}