import * as fs from "fs";
import {Server as SocketServer, Socket} from "socket.io";
import {ClientHandler, ClientType} from "./ClientHandler";
import {NetworkUpdateType, Packet, PacketScoreboardRegistry} from "./Packets";
import {createServer} from "https";

export class Server {

    public clientHandlers: Array<ClientHandler> = [];

    public socketServer: SocketServer;

    constructor(port: number, privkeypath: string, certpath: string) {
        console.log("Server initializing...");

        //Initialize Socket.io
        if (certpath === null || certpath === undefined || privkeypath === null || privkeypath === undefined) {
            this.socketServer = new SocketServer(port);
        } else {
            let server = createServer({
                key: fs.readFileSync(privkeypath),
                cert: fs.readFileSync(certpath)
            });

            this.socketServer = new SocketServer(server, {
                cors: {
                    origin: "*"
                }
            });
            server.listen(port);
        }

        //Handle connection
        this.socketServer.on('connection', this.onConnection);

        //Initialize server ticking
        setInterval(this.purgeConnections, 60000);

        console.log("Server listening on port " + port);
    };

    public removeClient = (client: ClientHandler) => {
        if (client.sio.connected) {
            client.sio.disconnect(0);
        }
        let index: number = this.clientHandlers.indexOf(client);
        this.clientHandlers.splice(index, 1);
        this.broadcastConnectionUpdate(client, NetworkUpdateType.LEAVE);
        console.log("Client " + client.id + " at " + client.getIP() + " disconnected!");
    };

    public purgeConnections = (): void => {
        let purge: Array<ClientHandler> = [];
        const thisserver = this;

        this.clientHandlers.forEach(function (client) {
            if (!client.isAlive() || client.pingIntegrity <= 0) {
                purge.push(client);
                return;
            }
        });

        purge.forEach(function (client) {
            thisserver.removeClient(client);
        })
    };

    public getConnectionSummary(accessKey: string) {
        var dataout = {};
        this.clientHandlers.forEach((client) => {
            if (client.boardinfo.accessKey === accessKey) {
                dataout[client.id] = client.getSummary();
            }
        });
        return dataout;
    }

    public getBoardClient(key: string) {
        var ret: any = null;
        this.clientHandlers.forEach((client) => {
            if (client.type == ClientType.SCOREBOARD) {
                if (client.boardinfo.accessKey === key) ret = client;
            }
        });
        return ret;
    }

    public broadcastConnectionUpdate(triggerClient: ClientHandler, eventType: NetworkUpdateType) {
        this.clientHandlers.forEach((client) => {
            if (client.sio.connected
                && client !== triggerClient
                && client.boardinfo.accessKey === triggerClient.boardinfo.accessKey) {

                var packetOut = new PacketScoreboardRegistry();
                packetOut.req = PacketScoreboardRegistry.Type.NETWORK_UPDATE;
                packetOut.payload = {
                    type: eventType,
                    client: triggerClient.getSummary()
                };

                client.send(Packet.Channels.Registry, packetOut);
            }
        })
    }

    private onConnection = (conn: Socket) => {
        let client: ClientHandler = new ClientHandler(this, conn);
        console.log("New connection from " + client.getIP() + " as client " + client.id);
        this.clientHandlers.push(client);

        // Send welcome packet
        var packetWelcome = new PacketScoreboardRegistry();
        packetWelcome.req = PacketScoreboardRegistry.Type.WELCOME;
        packetWelcome.payload = {id: client.id};
        client.send(Packet.Channels.Registry, packetWelcome);

        client.sio.on('disconnect', () => {
            this.removeClient(client);
        });
    };
}
