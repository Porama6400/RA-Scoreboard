function connect(key) {
    accessKey = key;
    $("#myaccesskey").text("-");

    socket.close();
    socket = io(server_addr);

    socket.on('connect', () => {
        socket.emit("sbr", {
            req: 3,
            payload: key
        });
    });

    socket.on("sbs", (p_in) => {
        if (p_in.req === 2) {
            data = p_in.payload;
            update();
        }
        else {
            if (p_in.req === 20) {
                $("#timer").text(p_in.payload);
            }
        }
    });
}