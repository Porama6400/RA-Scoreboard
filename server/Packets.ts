export class Packet {
    public static Channels = {
        Registry: "sbr",
        Score: "sbs"
    }
}

export class PacketScoreboardRegistry extends Packet {
    public req: number;
    public payload: any;

    public static Type = {
        REGISTER: 1, // SCOREBOARD CLIENT OPENING A SCOREBOARD
        ACKNOWLEDGE: 2, // REPLY FROM SERVER TO SCOREBOARD CLEINT
        USE: 10 // SPECIFIED WHAT SCOREBOARD TO REMOTE TO
    };

    constructor() {
        super();
    }
}