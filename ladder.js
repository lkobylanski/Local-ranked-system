var name = "";
var players = [];
var plength = 0;
var display = "LADDER RESULTS:<br><br>";
var w = 0;
var k = 0;
var s = 0;
var wks = (w * 5) + k + s;

function player(name, wins, kills, style, wks) {
    this.name = name;
    this.wins = wins;
    this.kills = kills;
    this.style = style;
    this.wks = wks;
}

function addPlayer() {
    name = document.getElementById("pname").value;
    var nameleng = name.length;

    if (nameleng > 0) {
        w = 0; //Math.floor((Math.random() * 10) + 1);
        k = 0; //Math.floor((Math.random() * 10) + 1);
        s = 0; //Math.floor((Math.random() * 10) + 1);
        wks = (w * 5) + k + s;

        var player1 = new player(name, w, k, s, wks);

        players.push(player1);
        plength = players.length;

        var s = saveData();
        //alert(player1.toSource()); //displaying object for debug puprposes FireFox only
    }
    else {
        alert("Please provide player name.");
        document.getElementById("result").innerHTML = display;
    }
    return;
}

function sortByWin() {
    players.sort(function (a, b) {
        return b.wins - a.wins
    })

    display = "LADDER RESULTS sorted by <b> WINS:</b><br><br>";

    for (var i = 0; i < plength; i++) {
        display = display + (i + 1) + "." + '<img src="avatars/' + players[i].name + '.jpg" alt="" class="avatar"> &nbsp;' + players[i].name + " | Wins: " + players[i].wins + " Kills: " + players[i].kills + " Style " + players[i].style + " Score: " + players[i].wks + "<br>";
        document.getElementById("result").innerHTML = display;
    }
}

function sortByKill() {
    players.sort(function (a, b) {
        return b.kills - a.kills
    })

    display = "LADDER RESULTS sorted by <b> KILLS:</b><br><br>";

    for (var i = 0; i < plength; i++) {
        display = display + (i + 1) + "." + '<img src="avatars/' + players[i].name + '.jpg" alt="" class="avatar"> &nbsp;' + players[i].name + " | Wins: " + players[i].wins + " Kills: " + players[i].kills + " Style " + players[i].style + " Score: " + players[i].wks + "<br>";
        document.getElementById("result").innerHTML = display;
    }
}

function sortByStyle() {
    players.sort(function (a, b) {
        return b.style - a.style
    })

    display = "LADDER RESULTS sorted by <b> STYLE:</b><br><br>";

    for (var i = 0; i < plength; i++) {
        display = display + (i + 1) + "." + '<img src="avatars/' + players[i].name + '.jpg" alt="" class="avatar"> &nbsp;' + players[i].name + " | Wins: " + players[i].wins + " Kills: " + players[i].kills + " Style " + players[i].style + " Score: " + players[i].wks + "<br>";
        document.getElementById("result").innerHTML = display;
    }
}

function sortByAll() {
    players.sort(function (a, b) {
        return b.wks - a.wks
    })

    display = "LADDER RESULTS sorted by <b> ELO</b>:<br>\"<i>CIĘŻAR KORONY</i>\"<br><br><img src=\"img/crown.png\" alt=\"crown.png\" class=\"crown\"><br>";

    for (var i = 0; i < plength; i++)
       display = display + (i + 1) + "." + '<img src="avatars/' + players[i].name + '.jpg" alt="" class="avatar"> &nbsp;' + players[i].name + " | Wins: " + players[i].wins + " Kills: " + players[i].kills + " Style " + players[i].style + " Score: " + players[i].wks + "<br>";
    document.getElementById("result").innerHTML = display;
}

function saveData() {
    if (plength < 1) {
        alert("There is no data to be saved. Please add some records first.");
    }
    else {
        players = JSON.stringify(players);
        localStorage.setItem("playersList", players);

        var x = loadData();
    }
    return;
}

function loadData() {
    players = localStorage.getItem("playersList");
    players = JSON.parse(players);
    plength = players.length;
    display = "LADDER RESULTS:<br><br>";

    for (var i = 0; i < plength; i++) {
        display = display + (i + 1) + "." + '<img src="avatars/' + players[i].name + '.jpg" alt="" class="avatar"> &nbsp;' + players[i].name + " | Wins: " + players[i].wins + " Kills: " + players[i].kills + " Style " + players[i].style + " Score: " + players[i].wks + "<br>";
        document.getElementById("result").innerHTML = display;
    }

    var cd = clearDrop();

    var select = document.getElementById("pick_player");

    for (var i = 0; i < plength; i++) { //funkcja na dodanie elemntów z drop down listy na podstawie arrayu var.textContent - dodaje wartosc textowa do listy, a el.value - wartosc jaka stoi za tym elementem listy
        var opt = players[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el); //append element
    }
}

function clearDrop() {
    var sel = document.getElementById("pick_player");
    var len = sel.options.length;

    for (var i = len; i >= 1; i--) {
        sel.options[i] = null;
    }
    return;
}

function removeData() {
    var c = confirm("List will be removed permanently. Remove the List?")

    if (c == true) {
        localStorage.removeItem("playersList");
        players = [];
        display = "LADDER RESULTS:<br><br>";
        document.getElementById("result").innerHTML = display;
    }
    else {
        return;
    }
    return;
}

function upData() {
    var ddl = document.getElementById("pick_player").value; //document.getElementById("pick_player"); //var selValue = ddl.options[ddl.selectedIndex].value;

    var win_val = document.getElementById("wins_num").value;
    var kill_val = document.getElementById("kill_num").value;
    var styl_val = document.getElementById("style_num").value;

    win_val = parseInt(win_val);
    kill_val = parseInt(kill_val);
    styl_val = parseInt(styl_val);

    var newNums = [win_val, kill_val, styl_val];

    for (var i = 0; i < newNums.length; i++) {
        if (isNaN(newNums[i]) == true) {
            if (i == 0) {
                win_val = 0;
            }
            else if (i == 1) {
                kill_val = 0;
            }
            else if (i == 2) {
                styl_val = 0;
            }
        }
    }

    if (ddl == "Choose Player") {
        alert("No player is selected");
    }
    else {
        for (var i = 0; i <= plength; i++) {
            if (ddl == players[i].name) {
                players[i].wins = win_val;
                players[i].kills = kill_val;
                players[i].style = styl_val;
                players[i].wks = ((win_val) * 5) + kill_val + styl_val;

                var s = saveData();
            }
        }
    }
    return;
}

function removePlayer() {
    var ddl = document.getElementById("pick_player").value

    if (ddl == "Choose Player") {
        alert("No player is selected.")
    }
    else {
        var c = confirm("Selected Player will be removed permanetly! Remove the Player?")

        if (c == true) {
            for (var i = 0; i < plength; i++) {
                if (ddl == players[i].name) {
                    players.splice(i, 1);

                    var s = saveData();
                }
            }
        }
        else {
            return;
        }
    }
    return;
}

function start() {
    var s = localStorage.getItem("playersList");

    if (s) {
        var x = loadData();
    }
    else {
        document.getElementById("result").innerHTML = display;
    }
    return;
}

function reload() {
    location.reload();
}

function versionTwo() {
    window.location.href = "add_one.html";
}

window.onload = start;