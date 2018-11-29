registerProtocol = 4; //Override register packet with 4, will register as sound client once connected

var sounds = {
    buzzer: new Audio("./sounds/BuzzerLL.mp3")
};

function soundRequestHandler(message) {
    if (message.req !== 30) return; //IGNORE IF IT IS NOT SOUND PACKET

    var audio = sounds[message.payload];
    if (audio === undefined) return;
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio.play();
}

socket.on("sbs", soundRequestHandler);