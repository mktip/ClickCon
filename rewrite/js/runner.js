(function(){
    var colList = [{colour:"#ff0000",char:"A",inverse:"#00ffff"}, 
    {colour:"#00ff00",char:"B",inverse:"#ff00ff"}, 
    {colour:"#0000ff",char:"C",inverse:"#ffff00"}, 
    {colour:"#ffff00",char:"D",inverse:"#0000ff"}, 
    {colour:"#ff00ff",char:"E",inverse:"#00ff00"}, 
    {colour:"#00cccc",char:"F",inverse:"#ff3333"}, 
    {colour:"#e65c00",char:"G",inverse:"#19a3ff"}, 
    {colour:"#2e5cb8",char:"H",inverse:"#d1a347"}, 
    {colour:"#800080",char:"I",inverse:"#7fff7f"}, 
    {colour:"#663300",char:"J",inverse:"#99ccff"}, 
    {colour:"#ff8080",char:"K",inverse:"#007f7f"}, 
    {colour:"#00802b",char:"L",inverse:"#ff7fd4"}, 
    {colour:"#008080",char:"M",inverse:"#ff7f7f"}, 
    {colour:"#800000",char:"N",inverse:"#7fffff"}, 
    {colour:"#666699",char:"O",inverse:"#999966"}, 
    {colour:"#cc9900",char:"P",inverse:"#3366ff"}];
    //startMenu(colList);
    inGame();
    var teams = [];
    var players = [];
    var gameMap = mapConverter(galconGalaxy7());

    //oldMapParser(gameMap);

    var settings = {playing: true, botTurn: false, hideScores: false, spawnCount: 5, teams: 1, randShields: false, randBlocks: false, fog: false, multiShield: false, debug: false};

    for(var r = 1; r <= 3; r++){
        teams.push(new team(r, colList[r-1]));
    }
    //console.log(teams);

    players[0] = new player(1, teams[0], "Knob0", colList[0], false);
    players[0].team = teams[0];
    teams[0].addPlayer(players[0]);

    for(var r = 1; r <= 4; r++){
        players.push(new bot((r+1), teams[1], "Knob-" + r, colList[r], true, 2));
        //players[r].team = teams[r];
        //teams[r].addPlayer(players[r]);
    }

    //console.log(players);

    players[1].team = teams[1];
    players[2].team = teams[1];
    teams[1].addPlayers([players[1], players[2]]);

    players[3].team = teams[2];
    players[4].team = teams[2];
    teams[2].addPlayers([players[3], players[4]]);

    // teams[0].addPlayers([players[0]]);
    // teams[1].addPlayers([players[1], players[2]]);
    // players[3].team = teams[2];
    // players[4].team = teams[2];
    // teams[2].addPlayers([players[3], players[4]]);
    //players[6].team = teams[3];
    //players[7].team = teams[3];
    //teams[3].addPlayers([players[6], players[7]]);

    var gameA = new game(teams, players, gameMap);

    gameA.loadTurnList();
    
    initMap(gameA, settings);

    var g = mapCan.getContext("2d");
    var arty = new art(g);
    setCanvasDims(gameMap);
    scoreboard(gameA, settings.hideScores);
    setUpControls(g, gameA, arty, settings);
    //g.scale(.15, .15);
    render(g, arty, gameA, settings);
})();