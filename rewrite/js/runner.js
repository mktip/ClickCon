(function(){
    var colList = [["#ff0000","A","#00ffff"], ["#00ff00","B","#ff00ff"], ["#0000ff","C","#ffff00"], ["#ffff00","D","#0000ff"], ["#ff00ff","E","#00ff00"], ["#00cccc","F","#ff3333"], ["#e65c00","G","#19a3ff"], ["#2e5cb8","H","#d1a347"], ["#800080","I","#7fff7f"], ["#663300","J","#99ccff"], ["#ff8080","K","#007f7f"], ["#00802b","L","#ff7fd4"], ["#008080","M","#ff7f7f"], ["#800000","N","#7fffff"], ["#666699","O","#999966"], ["#cc9900","P","#3366ff"]];
    //startMenu(colList);
    inGame();
    var teams = [];
    var players = [];
    var gameMap = mapConverter(praiseJibbers());

    console.log(gameMap);

    //oldMapParser(gameMap);

    var activePlayer = 1;
    var settings = {playing: true, botTurn: false, hideScores: false, spawnCount: 3, teams: 1, randShields: true, randBlocks: false, fog: false, multiShield: true, debug: false};

    
    var livePlayers;

    for(var r = 0; r < 1; r++){
        players.push(new bot((r+1), (r+1), "Knob-" + r, colList[r][0], colList[r][2], colList[r][1], true, 2));
    }

    //players[1] = new bot(2, 2, "KnobBot1", colList[1][0], colList[1][0], colList[1][2], colList[1][1], colList[1][1], true, 1);

    teams[0] = new team(1, colList[0][0], colList[0][1], colList[0][2]);
    players[0] = new player(1, teams[0], "Knob0", colList[0][0],  colList[0][2], colList[0][1], false);
    teams[0].addPlayers([players[0]]);
    console.log(players);
    console.log(teams);
    //players[1] = new bot(2, 1, "Knob-1", colList[1][0], colList[0][0], colList[1][2], colList[0][1], colList[1][1], true, 2);
    //players[2] = new bot(3, 2, "Knob-2", colList[2][0], colList[2][0], colList[2][2], colList[2][1], colList[2][1], true, 2);
    //players[3] = new bot(4, 2, "Knob-3", colList[3][0], colList[2][0], colList[3][2], colList[2][1], colList[3][1], true, 2);

    //players[4] = new player(5, 5, "Knob5", colList[4][0], colList[4][0], colList[4][2], colList[4][1], colList[4][1], false);

    initMap(gameMap, players, settings);
    livePlayers = setActives(players, settings.teams);

    var g = mapCan.getContext("2d");
    var arty = new art(g);
    setCanvasDims(gameMap);
    scoreboard(players, settings.hideScores);
    setUpControls(gameMap, players, livePlayers, g, arty, settings, activePlayer);
    //g.scale(.15, .15);
    render(g, arty, gameMap, settings, activePlayer);
})();