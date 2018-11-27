var server_addr = "ws://www.otlg.net:6440";
var socket = io(server_addr);
var accessKey = undefined;

//Logging conversation for debugging <3
socket.on("sbr", (a) => console.log(a));
socket.on("sbs", (a) => console.log(a));

socket.on('connect', () => {
    console.log('Connected to ' + server_addr);

    if (accessKey !== undefined) console.log("Connection restored! Resuming with previous key (" + accessKey + ")");
    socket.emit("sbr", {req: 1, payload: accessKey}); //Tell server "I am a scoreboard!"
});

//Scoreboard Registry (Management channel)
socket.on("sbr", (data) => {
    if (data.req === 2) {
        accessKey = data.payload;
        $("#myaccesskey").text(accessKey);
        alert("access key: " + accessKey);
    }
});

function broadcastScoreData() {
    var packetout = {
        req: 2,
        payload: data
    };
    socket.emit("sbs", packetout);
}

//Scoreboard Score (Score exchange channel)
socket.on("sbs", (p_in) => {
    //RESPONSE TO SCOREBOARD DATA REQUEST
    if (p_in.req === 1) {
        broadcastScoreData();
    } else if (p_in.req === 10) {
        data = p_in.payload;
        update();
        broadcastScoreData();
    }
    else if (p_in.req === 21) {
        setTimerCountdown(p_in.payload);
        pauseTimer();
    }
    else if (p_in.req === 22) {
        pauseTimer();
    }
});
