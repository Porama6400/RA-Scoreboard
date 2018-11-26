var server_addr = "ws://localhost:443";
var socket = io(server_addr);
var accessKey = undefined;
var dataInHandler = function () {
};
var tempDataHandler = null;

var tempHandlerQueue = [];

//Logging conversation for debugging <3
socket.on("sbr", (a) => console.log(a));
socket.on("sbs", (a) => console.log(a));

function use(key) {
    socket.emit("sbr", {
        req: 10,
        payload: key
    });
}

function sendRequest() {
    socket.emit("sbs", {
        req: 1
    });
}

function pushScoreboard(data) {
    socket.emit("sbs", {
        req: 10,
        payload: data
    });
}

socket.on("sbs", function (din) {
    if (din.req === 2) {
        dataInHandler(din.payload);
        if (tempDataHandler !== null) {
            tempDataHandler(din.payload);
            tempDataHandler = null;
        }
    }
});

function processQueue() {
    if (tempHandlerQueue.length > 0 && tempDataHandler == null) {
        tempDataHandler = tempHandlerQueue.pop();
        sendRequest();
    }
}

setInterval(processQueue, 50);