dataInHandler =function (data) {
    $('#team1-span').text(data.teamAname);
    $('#team2-span').text(data.teamBname);

    $('#team1-score').text(data.teamAscore);
    $('#team2-score').text(data.teamBscore);

    $('.team_customval').text(data.customValName);

    $('#team-a-cval').text(data.teamAcval);
    $('#team-b-cval').text(data.teamBcval);

    sporttype = data.sporttype;
    
};