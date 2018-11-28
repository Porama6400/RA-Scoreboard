dataInHandler = function (data) {

    $("#timer_enabled").val(data.timerEnable ? "on" : "off");

    $("#teamAname").val(data.teamAName);
    $("#teamBname").val(data.teamBName);

    $("#team_a_score").text(data.teamAscore);
    $("#team_b_score").text(data.teamBscore);
    $("#team_a_cval").text(data.teamAcval);
    $("#team_b_cval").text(data.teamBcval);
};

function setCvalPrefix(prefix) {
    if (prefix === "none") prefix = null;
    tempHandlerQueue.push((data) => {
        data.customValName = prefix;
        pushScoreboard(data);
    });
}

function setTimer(time) {
    socket.emit("sbs", {
        req: 21,
        payload: time
    });
}

function pauseTimer() {
    socket.emit("sbs", {
        req: 22
    });
}

function setTimerEnable(tedat) {
    if (tedat === "on") tedat = true;
    else tedat = false;

    tempHandlerQueue.push((data) => {
        data.timerEnable = tedat;
        pushScoreboard(data);
    });
}

function clearScore() {
    tempHandlerQueue.push((data) => {
        data.teamAscore = 0;
        data.teamBscore = 0;
        pushScoreboard(data);
    });
}

function setTeam(team, val) {
    tempHandlerQueue.push((data) => {
        if (team === "a") {
            data.teamAName = val;
        }
        else data.teamBName = val;
        pushScoreboard(data);
    });
}

function add(team, variable, value) {

    if (team === 'a') {
        if (variable === 'score') {
            tempHandlerQueue.push((data) => {
                data.teamAscore += value;
                pushScoreboard(data);
            });
        } else if (variable === 'cval') {
            tempHandlerQueue.push((data) => {
                data.teamAcval += value;
                pushScoreboard(data);
            });
        }
    }
    else {
        if (variable === "score") {
            tempHandlerQueue.push((data) => {
                data.teamBscore += value;
                pushScoreboard(data);

            });
        }
        if (variable === "cval") {
            tempHandlerQueue.push((data) => {
                data.teamBcval += value;
                pushScoreboard(data);

            });
        }
    }
}
