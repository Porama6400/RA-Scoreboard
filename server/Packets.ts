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

export class PacketScoreboardScore extends Packet {
    public req: number;
    public payload: any;

    public static Type = {
        REQUEST: 1,
        RESPONSE: 2,

        UPDATE: 10,
        SET: 11,

        TIMER_DISPLAY: 20,
        TIMER_SET: 21,
        TIMER_PAUSE: 22,
    };

    constructor() {
        super();
    }
}