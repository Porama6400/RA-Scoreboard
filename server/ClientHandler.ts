import {NetworkUpdateType, Packet, PacketScoreboardRegistry, PacketScoreboardScore} from "./Packets";
import {Utils} from "./Utils";
import {BoardInfo} from "./BoardInfo";
import {Server} from "./Server";


export enum ClientType {
    SCOREBOARD = 1,
    SCOREBOARD_MIRROR = 2,
    SOUND_PLAYER = 3,
    SYSTEM_MONITOR = 4,

    REMOTE = 10
}

export class ClientHandler {
    static nextClientID: number = 1; //What ID will given to next connected client

    server: Server;
    sio: any; //Socket.io connection
    type: ClientType = ClientType.REMOTE;
    boardinfo: BoardInfo = new BoardInfo();
    id: number;

    pingPayload: string = null;
    pingIntegrity: number = 10;

    constructor(server: Server, sio: any) {
        this.sio = sio;
        this.server = server;
        this.id = ClientHandler.nextClientID;
        ClientHandler.nextClientID++;

        //Scoreboard Registry Packets (sbr -> scoreboard registry)
        this.sio.on(Packet.Channels.Registry, (packet: PacketScoreboardRegistry) => {

            if (packet.req === PacketScoreboardRegistry.Type.REGISTER) {

                if (packet.payload === undefined || packet.payload === null) {
                    this.boardinfo.accessKey = Utils.generateID();
                }
                else {
                    this.boardinfo.accessKey = packet.payload;
                }
                console.log("Client " + this.id + " at " + this.getIP() + " running as a scoreboard on " + this.boardinfo.accessKey);

                let packetOut: PacketScoreboardRegistry = new PacketScoreboardRegistry();
                packetOut.req = PacketScoreboardRegistry.Type.ACKNOWLEDGE;
                packetOut.payload = this.boardinfo.accessKey;
                this.send(Packet.Channels.Registry, packetOut);
                this.type = ClientType.SCOREBOARD;
            }
            else if (packet.req === PacketScoreboardRegistry.Type.USE) {
                console.log("Client " + this.id + " at " + this.getIP() + " bound to the scoreboard " + packet.payload);
                this.useScoreboard(packet.payload);
            }
            else if (packet.req === PacketScoreboardRegistry.Type.MIRROR_REQUEST) {
                this.type = ClientType.SCOREBOARD_MIRROR;
                this.useScoreboard(packet.payload);
                console.log("Client" + this.id + " at " + this.getIP() + " mirroring the scoreboard " + packet.payload)
            }
            else if (packet.req === PacketScoreboardRegistry.Type.SOUND_REQUEST) {
                this.type = ClientType.SOUND_PLAYER;
                this.useScoreboard(packet.payload);
                console.log("Client " + this.id + " at " + this.getIP() + " running as a sound client on " + packet.payload)
            }
            else if(packet.req === PacketScoreboardRegistry.Type.SYSMONITOR){
                this.type = ClientType.SYSTEM_MONITOR;
                this.useScoreboard(packet.payload);
                console.log("Client " + this.id + " at " + this.getIP() + " running as a system monitor on " + packet.payload)
            }
            else if (packet.req === PacketScoreboardRegistry.Type.NETWORK_LIST) {
                var packetOut: PacketScoreboardRegistry = new PacketScoreboardRegistry();
                packetOut.req = PacketScoreboardRegistry.Type.NETWORK_LIST;
                packetOut.payload = this.server.getConnectionSummary(this.boardinfo.accessKey);
                this.send(Packet.Channels.Registry, packetOut);
            }
        });

        this.sio.on(Packet.Channels.Score, (msg: PacketScoreboardScore) => {

            if (this.boardinfo.accessKey == null) return;

            if (msg.req === PacketScoreboardScore.Type.SOUND) {
                // FORWARD SOUND PACKET TO EVERYONE EXCEPT SENDER
                this.server.clientHandlers.forEach((client) => {
                    if (client.sio.connected
                        && client != this
                        && client.boardinfo.accessKey === this.boardinfo.accessKey) {
                        client.send(Packet.Channels.Score, msg);
                    }
                })
            } else if (this.type === ClientType.SCOREBOARD) {
                //FORWARD MESSAGES FROM SCOREBOARD TO CLIENT
                this.server.clientHandlers.forEach((client) => {
                    if (client.sio.connected
                        && client.type !== ClientType.SCOREBOARD
                        && client.boardinfo.accessKey === this.boardinfo.accessKey) {
                        client.send(Packet.Channels.Score, msg);
                    }
                })
            }
            else {
                // FORWARD MESSAGE TO SCOREBOARD IF SCOREBOARD ONLINE
                var target: ClientHandler = this.getBoardHolder();
                if (target != null) target.send(Packet.Channels.Score, msg);
            }
        });
    }

    getSummary(): any {
        return {
            id: this.id,
            ip: this.getIP(),
            type: this.type,
            typeString: ClientType[this.type].toString()
        };
    }

    isAlive(): boolean {
        return this.sio.connected;
    }

    getIP(): any {
        return this.sio.handshake.address;
    }

    useScoreboard(key: string) {
        this.boardinfo.accessKey = key;
        this.server.broadcastConnectionUpdate(this, NetworkUpdateType.JOIN);
    }

    getBoardHolder() {
        // For remote to get scoreboard's client handler

        return this.server.getBoardClient(this.boardinfo.accessKey);
    }

    send(channel: String, data: any) {
        this.sio.emit(channel, data);
    }
}