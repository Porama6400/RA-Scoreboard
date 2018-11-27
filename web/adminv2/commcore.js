var server_addr = "ws://www.otlg.net:6440";
var socket = io(server_addr);
var accessKey = undefined;
var dataInHandler = function () {
};
var _tempDataHandler = null;

var tempHandlerQueue = [];

//Logging conversation for debugging <3
socket.on("sbr", (a) => console.log(a));
socket.on("sbs", (a) => console.log(a));

function use(key) {
    socket.emit("sbr", {
        req: 10,
        payload: key
    });
    sendRequest();
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
        if (_tempDataHandler !== null) {
            _tempDataHandler(din.payload);
            _tempDataHandler = null;
        }
        else {
            dataInHandler(din.payload);
        }
    }
});

function processQueue() {
    if (tempHandlerQueue.length > 0 && _tempDataHandler == null) {
        _tempDataHandler = tempHandlerQueue.pop();
        sendRequest();
    }
}

setInterval(processQueue, 50);