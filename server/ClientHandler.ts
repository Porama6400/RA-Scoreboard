export class ClientHandler {
    sio: any; //Socket.io connection

    constructor(sio: any) {
        this.sio = sio;
    }

    isAlive(): boolean {
        return this.sio.connected;
    }

    getIP(): any {
        return this.sio.handshake.address;
    }
}