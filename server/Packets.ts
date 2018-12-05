export class Packet {
    public static Channels = {
        Registry: "sbr",
        Score: "sbs"
    }
}

export class NetworkUpdateType {
    public static JOIN = "join";
    public static LEAVE = "leave";
    //public LAG = "lag";
}

export class PacketScoreboardRegistry extends Packet {
    public req: number;
    public payload: any;

    public static Type = {
        WELCOME: 0, //TELL CLIENT ITS ID
        REGISTER: 1, // SCOREBOARD CLIENT OPENING A SCOREBOARD
        ACKNOWLEDGE: 2, // REPLY FROM SERVER TO SCOREBOARD CLEINT
        MIRROR_REQUEST: 3, // REQUEST TO ACT LIKE A MIRROR
        SOUND_REQUEST: 4,
        SYSMONITOR: 5,

        USE: 10, // SPECIFIED WHAT SCOREBOARD TO REMOTE TO

        NETWORK_LIST: 20,
        NETWORK_UPDATE: 21,
    };

    constructor() {
        super();
    }
}

export class PacketScoreboardScore extends Packet {
    public req: number;
    public payload: any;

    public static Type = {
        REQUEST: 1, // ASK FOR SCOREBOARD DATA
        RESPONSE: 2, // SCOREBOARD DATA RETURN FROM SCOREBOARD


        UPDATE: 10, // REQUEST SCOREBOARD UPDATE

        TIMER_STATUS: 20, // TIMER BROADCASTING PACKET
        TIMER_SET: 21, // PACKET SET TIMER
        TIMER_PAUSE: 22, // PACKET PAUSE TIMER
        TIMER_END_ANNOUNCE: 23, // BROADCAST WHEN TIMER ENDED

        SOUND: 30 // REQUEST SOUND PLAYING
    };

    constructor() {
        super();
    }
}