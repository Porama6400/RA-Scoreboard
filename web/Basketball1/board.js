var sporttype = "Basketball";//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var sporttype)

var teamAName = "green"; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var teamAName)
var teamBName = "red";//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var teamBName) \

var teamAscore = 0; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var teamAscore)
var teamBscore = 0; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var teamBscore)


var customValName = null;
var teamAcval = 0;
var teamBcval = 0;


function update() {
    if (sporttype === 'Basketball') {
        customValName = "foul";
    } else if (sporttype === 'Volleyball') {
        customValName = "set"
    }

    if (customValName == null) {
        $("#team_a_customval").text("");
        $("#team_b_customval").text("");
    }
    else {
        $("#team_a_customval").text(customValName + ": " + teamAcval);
        $("#team_b_customval").text(customValName + ": " + teamBcval);
    }

    $("#team_a_score").text(teamAscore);
    $("#team_b_score").text(teamBscore);

    if (teamAName === 'red') {
        $("#team-1-logo").attr("src", "../assets/Red-left.jpg");
    } else if (teamAName === 'green') {
        $("#team-1-logo").attr("src", "../assets/Green-left.jpg");
    } else if (teamAName === 'yellow') {
        $("#team-1-logo").attr("src", "../assets/Yellow-left.jpg");
    } else if (teamAName === 'blue') {
        $("#team-1-logo").attr("src", "../assets/Blue-left.jpg");
    }

    if (teamBName === 'red') {
        $("#team-2-logo").attr("src", "../assets/Red-right.jpg");
    } else if (teamBName === 'green') {
        $("#team-2-logo").attr("src", "../assets/Green-right.jpg");
    } else if (teamBName === 'yellow') {
        $("#team-2-logo").attr("src", "../assets/Yellow-right.jpg");
    } else if (teamBName === 'blue') {
        $("#team-2-logo").attr("src", "../assets/Blue-right.jpg");
    }
}


$(document).ready(() => {
    update();
});