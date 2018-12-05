registerProtocol = 5;

function requestClientList() {
    socket.emit("sbr", {req: 20});
}

function btnLoginHandler() {
    use($('#acckey').val());
    requestClientList();
}

function sbrHandler(data) {
    if (data.req === 20) {
        var buf = "";

        for (var key in data.payload) {
            if (data.payload.hasOwnProperty(key)) {
                var value = data.payload[key];

                buf += "<tr><td>" +
                    value.id +
                    "</td><td>" +
                    value.ip +
                    "</td><td>" +
                    value.typeString +
                    "</td></tr>"
            }
        }

        $("#tabledata").html(buf);
        console.log(data.payload);
    }
    else if (data.req === 21) {
        requestClientList();
    }
}

socket.on("sbr", sbrHandler);

socket.on("connect", (a) => {
    requestClientList()
});