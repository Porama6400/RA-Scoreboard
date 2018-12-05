var server_addr = "wss://www.otlg.net:6440";
//var server_addr = "ws://localhost:6440";

var socket = io(server_addr);

var registerProtocol = 10; //DEFAULT as 10 (REMOTE) can be other as well such as
var clientID = -1;

//System variables
var accessKey = undefined;
var dataInHandler = function () {
};
var _tempDataHandler = null;
var tempHandlerQueue = [];

//socket.on("sbs", (data) => console.log(data.payload));
//socket.on("sbr", (data) => console.log(data.payload));

//Functions
function use(key) {
    accessKey = key;
    socket.emit("sbr", {
        req: registerProtocol,
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

function _welcomeHandler(data) {
    if (data.req === 0) {
        clientID = data.payload.id;
    }
}

socket.on("sbr", _welcomeHandler);

function playSound(name) {
    socket.emit("sbs", {
        req: 30,
        payload: name
    });
}

function processQueue() {
    if (tempHandlerQueue.length > 0 && _tempDataHandler == null) {
        _tempDataHandler = tempHandlerQueue.pop();
        sendRequest();
    }
}

setInterval(processQueue, 50);


//"Connected" event
socket.on("connect", () => {
    if (accessKey !== undefined)
        use(accessKey);
});

//Scoreboard score channel handler
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
    else if (din.req === 20) {
        //Timer status
        $("#timedisplay").text(din.payload);
    }
});

