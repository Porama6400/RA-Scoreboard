var team1Name = "blue" //= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team1Name) 
var team2Name = ""//= recieve val from sockt io (from admin/in-game-admin-panel/main.js var team2Name) 

if (team1Name.value === 'red') {
    $("#team-1-logo").attr("src","../assets/vampire_logo.png");
}
if (team1Name.value === 'green') {
    $("#team-1-logo").attr("src","../assets/siren_logo.png");
}
if (team1Name.value === 'yellow') {
    $("#team-1-logo").attr("src","../assets/ninetail_logo.png");
}
if (team1Name.value === 'blue') {
    $("#team-1-logo").attr("src","../assets/werewolf_logo.png");
}