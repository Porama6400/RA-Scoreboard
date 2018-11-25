var sporttype = "Basketball" //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var sporttype) 

var team1Name = "blue" //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team1Name) 
var team2Name = "green"//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team2Name) 

var team1foul = 1; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team1foul) 
var team2foul = 2; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team2foul)

var team1set = 1; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team1set) 
var team2set = 0; //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team2set)


$(document).ready(function () {

    if (sporttype === 'Basketball') {
        $('#team_a_customval').html("foul: " + team1foul);
        $('#team_b_customval').html("foul: " + team2foul);
        $('.score_customval_placeholder').show();
        
    }
    if (sporttype === 'Volleyball') {
        $('#team_a_customval').html("set: " + team1set);
        $('#team_b_customval').html("set: " + team2set);
        $('.score_customval_placeholder').show();
        
    }
    

    if (team1Name === 'red') {
        $("#team-1-logo").attr("src", "../assets/vampire_logo.png");
        $("#team_a_title").html("Vampire");
    }
    if (team1Name === 'green') {
        $("#team-1-logo").attr("src", "../assets/siren_logo.png");
        $("#team_a_title").html("Siren");
    }
    if (team1Name === 'yellow') {
        $("#team-1-logo").attr("src", "../assets/ninetail_logo.png");
        $("#team_a_title").html("Ninetail");
    }
    if (team1Name === 'blue') {
        $("#team-1-logo").attr("src", "../assets/werewolf_logo.png");
        $("#team_a_title").html("Werewolf");
    }

    if (team2Name === 'red') {
        $("#team-2-logo").attr("src", "../assets/vampire_logo.png");
        $("#team_b_title").html("Vampire");
    }
    if (team2Name === 'green') {
        $("#team-2-logo").attr("src", "../assets/siren_logo.png");
        $("#team_b_title").html("Siren");
    }
    if (team2Name === 'yellow') {
        $("#team-2-logo").attr("src", "../assets/ninetail_logo.png");
        $("#team_b_title").html("Ninetail");
    }
    if (team2Name === 'blue') {
        $("#team-2-logo").attr("src", "../assets/werewolf_logo.png");
        $("#team_b_title").html("Werewolf");
    }
});
