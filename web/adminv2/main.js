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
