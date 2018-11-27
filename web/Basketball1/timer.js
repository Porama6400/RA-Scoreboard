var updateInterval = null;
var endtime;

function setTimerCountdown(time_in_minutes, raw_endtime) {
    if (raw_endtime === undefined) {
        var current_time = Date.parse(new Date());
        endtime = new Date(current_time + time_in_minutes * 60 * 1000);
    }
    else {
        endtime = raw_endtime;
    }

    function update_clock() {
        var t = time_remaining(endtime);
        var msg = t.minutes + '.' + ("0" + t.seconds).substr(-2);
        socket.emit("sbs", {
            req: 20,
            payload: msg
        });
        $('#timer').text(msg);
        if (t.total <= 0) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    update_clock();

    if (updateInterval != null) clearInterval(updateInterval);
    updateInterval = setInterval(update_clock, 1000);
}


function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds};
}


var _paused = false; // is the clock _paused?
var time_left; // time left on the clock when _paused

function pauseTimer() {
    if (!_paused) {
        clearInterval(updateInterval);
        time_left = time_remaining(endtime).total;
    }
    else {
        setTimerCountdown(1, new Date(Date.parse(new Date()) + time_left));
    }
    _paused = !_paused;
}
