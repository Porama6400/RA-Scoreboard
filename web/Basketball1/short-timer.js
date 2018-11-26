var updateIntervalSec = null;
var endtimeSec;

function setTimerCountdownSec(time_in_seconds,raw_endtimeSec) {
    if(raw_endtimeSec === undefined) {
        var current_time_sec = Date.parse(new Date());
        endtimeSec = new Date(current_time_sec + time_in_seconds * 1000);
    }
    else{
        endtimeSec = raw_endtimeSec;
    }
    function update_clock_sec() {
        var t_sec = time_remaining_sec(endtimeSec);
        $('#short-timer').html('0.' + ("0" + t_sec.seconds).substr(-2));
        if (t_sec.seconds <= 0) {
            clearInterval(updateIntervalSec);
            updateIntervalSec = null;
        }
    }

    update_clock_sec();

    if (updateIntervalSec != null) clearInterval(updateInterval);
    updateInterval = setInterval(update_clock_sec, 1000);
}


function time_remaining_sec(endtime) {
    var t_sec = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t_sec / 1000) % 60);
    var minutes = Math.floor((t_sec / 1000 / 60) % 60);
    var hours = Math.floor((t_sec / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t_sec / (1000 * 60 * 60 * 24));
    return {'total': t_sec, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds};
}


var _paused_sec = false; // is the clock _paused?
var time_left_sec; // time left on the clock when _paused

function pauseTimerSec() {
    if (!_paused) {
        clearInterval(updateIntervalSec);
        time_left = time_remaining(endtimeSec).total;
    }
    else {
        setTimerCountdownSec(1 , new Date(Date.parse(new Date()) + time_left));
    }
    _paused_sec = !_paused_sec;
}
