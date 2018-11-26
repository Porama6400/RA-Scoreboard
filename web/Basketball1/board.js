var data = {
    sporttype: "Basketball",
    teamAName: "green",
    teamBName: "red",
    teamAscore: 0,
    teamBscore: 0,

    customValName: null,
    teamAcval: 0,
    teamBcval: 0
};

function update() {
    if (data.sporttype === 'Basketball') {
        data.customValName = "foul";
    } else if (data.sporttype === 'Volleyball') {
        data.customValName = "set"
    }

    if (data.customValName == null) {
        $("#team_a_customval").text("");
        $("#team_b_customval").text("");
    }
    else {
        $("#team_a_customval").text(data.customValName + ": " + data.teamAcval);
        $("#team_b_customval").text(data.customValName + ": " + data.teamBcval);
    }

    $("#team_a_score").text(data.teamAscore);
    $("#team_b_score").text(data.teamBscore);

    if (data.teamAName === 'red') {
        $("#team-1-logo").attr("src", "../assets/Red-left.jpg");
    } else if (data.teamAName === 'green') {
        $("#team-1-logo").attr("src", "../assets/Green-left.jpg");
    } else if (data.teamAName === 'yellow') {
        $("#team-1-logo").attr("src", "../assets/Yellow-left.jpg");
    } else if (data.teamAName === 'blue') {
        $("#team-1-logo").attr("src", "../assets/Blue-left.jpg");
    }

    if (data.teamBName === 'red') {
        $("#team-2-logo").attr("src", "../assets/Red-right.jpg");
    } else if (data.teamBName === 'green') {
        $("#team-2-logo").attr("src", "../assets/Green-right.jpg");
    } else if (data.teamBName === 'yellow') {
        $("#team-2-logo").attr("src", "../assets/Yellow-right.jpg");
    } else if (data.teamBName === 'blue') {
        $("#team-2-logo").attr("src", "../assets/Blue-right.jpg");
    }
}


$(document).ready(() => {
    update();
});