function setTeam(team1Name, team2Name) {
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


$(document).ready(function () {
    setTeam("red", "green");
});
