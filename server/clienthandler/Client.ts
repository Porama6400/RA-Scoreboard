export class Client {
    sio: any; //Socket.io connection

    constructor(sio: any) {
        this.sio = sio;
    }

    isAlive(): boolean {
        return this.sio.connected;
    }

    ip(): any{
        return this.sio.handshake.address;
    }
}