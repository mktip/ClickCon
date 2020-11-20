(function(){
    var colList = [["#ff0000","A","#00ffff"], ["#00ff00","B","#ff00ff"], ["#0000ff","C","#ffff00"], ["#ffff00","D","#0000ff"], ["#ff00ff","E","#00ff00"], ["#00cccc","F","#ff3333"], ["#e65c00","G","#19a3ff"], ["#2e5cb8","H","#d1a347"], ["#800080","I","#7fff7f"], ["#663300","J","#99ccff"], ["#ff8080","K","#007f7f"], ["#00802b","L","#ff7fd4"], ["#008080","M","#ff7f7f"], ["#800000","N","#7fffff"], ["#666699","O","#999966"], ["#cc9900","P","#3366ff"]];
    //startMenu(colList);
    inGame();
    var gameMap = mapConverter(praiseJibbers());

    //oldMapParser(gameMap);

    var activePlayer = 1;
    var settings = {playing: true, botTurn: false, hideScores: false, spawnCount: 100, teams: 4, randShields: false, randBlocks: false, fog: false, multiShield: false, debug: false};

    var players = [];
    var livePlayers;

    for(var r = 0; r < 4; r++){
        players.push(new bot((r+1), (r+1), "Knob-" + r, colList[r][0], colList[r][0], colList[r][2], colList[r][1], colList[r][1], true, 2));
    }

    //players[1] = new bot(2, 2, "KnobBot1", colList[1][0], colList[1][0], colList[1][2], colList[1][1], colList[1][1], true, 1);

    players[0] = new player(1, 1, "Knob0", colList[0][0], colList[0][0], colList[0][2], colList[0][1], colList[0][1], false);
    //players[1] = new bot(2, 1, "Knob-1", colList[1][0], colList[0][0], colList[1][2], colList[0][1], colList[1][1], true, 2);
    //players[2] = new bot(3, 2, "Knob-2", colList[2][0], colList[2][0], colList[2][2], colList[2][1], colList[2][1], true, 2);
    //players[3] = new bot(4, 2, "Knob-3", colList[3][0], colList[2][0], colList[3][2], colList[2][1], colList[3][1], true, 2);

    //players[4] = new player(5, 5, "Knob5", colList[4][0], colList[4][0], colList[4][2], colList[4][1], colList[4][1], false);

    initMap(gameMap, players, settings);
    livePlayers = setActives(players, settings.teams);

    console.log(livePlayers);

    var g = mapCan.getContext("2d");
    setCanvasDims(gameMap);
    scoreboard(players, settings.hideScores);
    setUpControls(gameMap, players, livePlayers, g, settings, activePlayer);
    //g.scale(.15, .15);
    render(g, gameMap, settings, activePlayer);
})();