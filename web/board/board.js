var data = {
    //sporttype: "Basketball",
    teamAName: "red",
    teamBName: "yellow",
    teamAscore: 0,
    teamBscore: 0,

    customValName: null,
    teamAcval: 0,
    teamBcval: 0,

    timerEnable: false
};

function update() {
    if (data.customValName == null) {
        $("#team-a-cval").text("");
        $("#team-b-cval").text("");
    }
    else {
        $("#team-a-cval").text(data.customValName + ": " + data.teamAcval);
        $("#team-b-cval").text(data.customValName + ": " + data.teamBcval);
    }

    if (data.timerEnable) {
        $("#timer").show();
    }
    else {
        $("#timer").hide();
    }

    $("#team_a_score").text(data.teamAscore);
    $("#team_b_score").text(data.teamBscore);

    if (data.teamAName === 'red') {
        $("#team-1-logo").attr("src", "../sounds/Red-left.jpg");
    } else if (data.teamAName === 'green') {
        $("#team-1-logo").attr("src", "../sounds/Green-left.jpg");
    } else if (data.teamAName === 'yellow') {
        $("#team-1-logo").attr("src", "../sounds/Yellow-left.jpg");
    } else if (data.teamAName === 'blue') {
        $("#team-1-logo").attr("src", "../sounds/Blue-left.jpg");
    }

    if (data.teamBName === 'red') {
        $("#team-2-logo").attr("src", "../sounds/Red-right.jpg");
    } else if (data.teamBName === 'green') {
        $("#team-2-logo").attr("src", "../sounds/Green-right.jpg");
    } else if (data.teamBName === 'yellow') {
        $("#team-2-logo").attr("src", "../sounds/Yellow-right.jpg");
    } else if (data.teamBName === 'blue') {
        $("#team-2-logo").attr("src", "../sounds/Blue-right.jpg");
    }
}


$(document).ready(() => {
    update();
});