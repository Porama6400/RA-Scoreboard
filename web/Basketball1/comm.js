var server_addr = "ws://localhost:443";
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
    }
});

//Scoreboard Score (Score exchange channel)
socket.on("sbs", (data) => {

});
