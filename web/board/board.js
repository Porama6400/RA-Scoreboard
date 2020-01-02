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
        $("#team-1-logo").attr("src", "../assets/red-left.webp");
    } else if (data.teamAName === 'green') {
        $("#team-1-logo").attr("src", "../assets/green-left.webp");
    } else if (data.teamAName === 'yellow') {
        $("#team-1-logo").attr("src", "../assets/yellow-left.webp");
    } else if (data.teamAName === 'blue') {
        $("#team-1-logo").attr("src", "../assets/blue-left.wepb");
    }

    if (data.teamBName === 'red') {
        $("#team-2-logo").attr("src", "../assets/red-right.webp");
    } else if (data.teamBName === 'green') {
        $("#team-2-logo").attr("src", "../assets/green-right.webp");
    } else if (data.teamBName === 'yellow') {
        $("#team-2-logo").attr("src", "../assets/yellow-right.webp");
    } else if (data.teamBName === 'blue') {
        $("#team-2-logo").attr("src", "../assets/blue-right.webp");
    }
}


$(document).ready(() => {
    update();
});