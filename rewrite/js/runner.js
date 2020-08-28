(function(){
    var colList = [["#ff0000","A","#00ffff"], ["#00ff00","B","#ff00ff"], ["#0000ff","C","#ffff00"], ["#ffff00","D","#0000ff"], ["#ff00ff","E","#00ff00"], ["#00cccc","F","#ff3333"], ["#e65c00","G","#19a3ff"], ["#2e5cb8","H","#d1a347"], ["#800080","I","#7fff7f"], ["#663300","J","#99ccff"], ["#ff8080","K","#007f7f"], ["#00802b","L","#ff7fd4"], ["#008080","M","#ff7f7f"], ["#800000","N","#7fffff"], ["#666699","O","#999966"], ["#cc9900","P","#3366ff"]];
    //startMenu(colList);
    inGame();
    var gameMap = mapConverter(praiseJibbers());

    var players = [new player(1,1,"Mins-1", colList[0][0], colList[0][0], colList[0][2], colList[0][1], colList[0][1], false),
    new player(2,2,"Mins-1", colList[1][0], colList[1][0], colList[1][2], colList[1][1], colList[1][1], false),
    new player(3,3,"Mins-1", colList[2][0], colList[2][0], colList[2][2], colList[2][1], colList[2][1], false),
    new player(4,4,"Mins-1", colList[3][0], colList[3][0], colList[3][2], colList[3][1], colList[3][1], false),
    new player(5,5,"Mins-1", colList[4][0], colList[4][0], colList[4][2], colList[4][1], colList[4][1], false)]

    // var tstpl = new bot(1, 1, "Mins-1", colList[8][0], colList[8][0], colList[8][2], colList[8][1],colList[8][1], true, 1);
    // var tstpl2 = new bot(2, 2, "Mins-2", colList[6][0], colList[6][0], colList[6][2], colList[6][1],colList[6][1], true, 0);

    // //tId, tCol, oId, oCol, iCol, oChar, tChar
    // gameMap[0].setOwner(tstpl.getTeamId(), tstpl.getTeamColour(), tstpl.getId(), tstpl.getColour(), tstpl.getInverse(), tstpl.getChars()[1], tstpl.getChars()[0]);
    // gameMap[5].setOwner(tstpl2.getTeamId(), tstpl2.getTeamColour(), tstpl2.getId(), tstpl2.getColour(), tstpl2.getInverse(), tstpl2.getChars()[1], tstpl2.getChars()[0]);

    //setUp(gameMap);

    setCanvasDims(gameMap);
    scoreboard(players, true, true);
    var g = mapCan.getContext("2d");
    //g.scale(.15, .15);
    render(g, gameMap, {fog: false, colourblind: true, debug: false});
})();