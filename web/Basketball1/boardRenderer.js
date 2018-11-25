var board = {
    customVal: {
        enable: true,
        name: "foul"
    },
    teamA: {
        color: "red",
        score: 0,
        customVal: 0
    },

    teamB: {
        color: "blue",
        score: 0,
        customVal: 0

    }

};


function updateTeam(team1Name, team2Name) {
    //var team1Name = "blue";//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team1Name)
    //var team2Name = "green";//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team2Name)
    if (team1Name === 'red') {
        $("#team-1-logo").attr("src", "../assets/vampire_logo.png");
        $("#team_a_title").html("Vampire");
    } else if (team1Name === 'green') {
        $("#team-1-logo").attr("src", "../assets/siren_logo.png");
        $("#team_a_title").html("Siren");
    } else if (team1Name === 'yellow') {
        $("#team-1-logo").attr("src", "../assets/ninetail_logo.png");
        $("#team_a_title").html("Ninetail");
    } else if (team1Name === 'blue') {
        $("#team-1-logo").attr("src", "../assets/werewolf_logo.png");
        $("#team_a_title").html("Werewolf");
    }

    if (team2Name === 'red') {
        $("#team-2-logo").attr("src", "../assets/vampire_logo.png");
        $("#team_b_title").html("Vampire");
    } else if (team2Name === 'green') {
        $("#team-2-logo").attr("src", "../assets/siren_logo.png");
        $("#team_b_title").html("Siren");
    } else if (team2Name === 'yellow') {
        $("#team-2-logo").attr("src", "../assets/ninetail_logo.png");
        $("#team_b_title").html("Ninetail");
    } else if (team2Name === 'blue') {
        $("#team-2-logo").attr("src", "../assets/werewolf_logo.png");
        $("#team_b_title").html("Werewolf");
    }
}

function update() {
    updateTeam(board.teamA.color, board.teamB.color);
    $("#team_a_score").text(board.teamA.score);
    $("#team_b_score").text(board.teamB.score);

    if(!board.customVal.enable){
        $("#team_a_customval").text("");
        $("#team_b_customval").text("");
    }
    else{
        $("#team_a_customval").text(board.customVal.name + ": " + board.teamA.customVal);
        $("#team_b_customval").text(board.customVal.name + ": " + board.teamB.customVal);
    }
}

$(document).ready(function () {
    update();
});
