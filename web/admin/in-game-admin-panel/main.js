
var sporttype = ""

var team1Name = "";
var team2Name = "";

var team1score = 0;
var team2score = 0;

var team1foul = 0;
var team2foul = 0;

var team1set = 0;
var team2set = 0;



function generate() {
    var team1 = document.getElementById('edit-team1-data');
    var team2 = document.getElementById('edit-team2-data');
    var countdown = document.getElementById('timer_full');
    sporttype = document.getElementById('edit-sport-type');

    console.log(countdown.value);

    if (team1.value === 'select color' || team2.value === "select color" || sporttype.value === 'sport type') {
        alert('please fill the dropdown menu');
        return;
    }
    if (team1.value === team2.value) {
        alert('please select difference team');
        return;
    }
    if (sporttype.value === 'Basketball') {
        $('#basketball-foul').show();
        $('#bassketball-foul-score').show();
        $('#normal-panel').hide();
        $('.basketball-panel').show();


        document.getElementById("team1-foul-score").innerHTML = team1foul;
        document.getElementById("team2-foul-score").innerHTML = team2foul;
    }
    if (sporttype.value === 'Volleyball') {
        $('#volleyball-set-won').show();
        $('#volleyball-set').show();

        document.getElementById("team1-set-score").innerHTML = team1foul;
        document.getElementById("team2-set-score").innerHTML = team2foul;

    }

    if (team1.value === 'f000ff') { //red
        team1Name = 'red';
    }
    if (team1.value === 'ff000f') { //green
        team1Name = 'green';
    }
    if (team1.value === 'fff000') {
        team1Name = 'yellow';
    }
    if (team1.value === 'f0f00f') {
        team1Name = 'blue';
    }

    //team2
    if (team2.value === 'f000ff') { //red
        team2Name = 'red';
    }
    if (team2.value === 'ff000f') { //green
        team2Name = 'green';
    }
    if (team2.value === 'fff000') {
        team2Name = 'yellow';
    }
    if (team2.value === 'f0f00f') {
        team2Name = 'blue';
    }

    document.getElementById("sport-type-span").innerHTML = sporttype.value;
    document.getElementById("team1-span").innerHTML = team1Name;
    document.getElementById("team1-score").innerHTML = team1score;
    document.getElementById("team2-span").innerHTML = team2Name;
    document.getElementById("team2-score").innerHTML = team2score

    showEdit();
}

function add(team, val) {
    if (team === 'team1') {
        team1score += val
        if (team1score <= 0) {
            team1score = 0
        }
        document.getElementById("team1-score").innerHTML = team1score;
    }
    if (team === 'team2') {
        team2score += val
        if (team2score <= 0) {
            team2score = 0
        }
        document.getElementById("team2-score").innerHTML = team2score;
    }
    if (team === 'team1-set') {
        team1set += val
        if (team1set <= 0 || team1set > 3) {
            team1set = 0
        }
        document.getElementById("team1-set-score").innerHTML = team1set;
    }
    if (team === 'team2-set') {
        team2set += val
        if (team2set <= 0 || team2set > 3) {
            team2set = 0
        }
        document.getElementById("team2-set-score").innerHTML = team2set;
    }
    else {
        console.log(team)
        console.log(val)
        return
    }
}

function foul(team, val) {
    if (team === 'team1') {
        team1foul = team1foul + val;
        if (team1foul <= 0) {
            team1foul = 0
        }
        document.getElementById("team1-foul-score").innerHTML = team1foul;
    }
    if (team === 'team2') {
        team2foul = team2foul + val;

        if (team2foul <= 0) {
            team2foul = 0
        }
        document.getElementById("team2-foul-score").innerHTML = team2foul;
    }
    else {
        console.log(team)
        console.log(val)
        return
    }
}

function test() {
    console.log(team1);
}

function showEdit() {
    $('#panel_config').hide();
    $('#panel_edit').show();
    //configPanel means team setup (landing page after login)       
}

function showConfig() {
    $('#panel_edit').hide();
    $('#panel_config').show();
}

function timer() {
    document.getElementById("timer-count").innerHTML = 'shit';
}

function coloner(input) {
    var value = input.value,
        value = value.split(':').join('');

    if (value.length > 3) {
      value = value.substring(0, value.length - 2) + ':' + value.substring(value.length - 2, value.length);
    }

    input.value = value;

}



