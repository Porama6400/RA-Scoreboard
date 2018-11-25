export class Packet {
    public static REGISTER = 1;
}

export class PacketScoreboardRegistry extends Packet {
    public req: number;
    public payload: any;

    constructor() {
        super();
    }
}