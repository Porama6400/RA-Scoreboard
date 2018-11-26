var server_addr = "ws://localhost:443";
var socket = io(server_addr);
var accessKey = undefined;

//Logging conversation for debugging <3
socket.on("sbr", (a) => console.log(a));
socket.on("sbs", (a) => console.log(a));

socket.

//Scoreboard Registry (Management channel)
socket.on("sbr", (data) => {
    if (data.req === 2) {
        accessKey = data.payload;
    }
});

//Scoreboard Score (Score exchange channel)
socket.on("sbs", (p_in) => {
    //RESPONSE TO SCOREBOARD DATA REQUEST
    if (p_in.req === 1) {
        var packetout = {
            req: 2,
            payload: data
        };
        socket.emit("sbs", packetout);
    } else if (p_in.req === 10) {
        data = p_in.payload;
        update();
    }
});
