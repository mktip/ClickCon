(function(){
    var colList = [["#ff0000","A","#0000ff"], ["#00ff00","B","#ff00ff"], ["#0000ff","C","#ffff00"], ["#ffff00","D","#0000ff"], ["#ff00ff","E","#00ff00"], ["#00cccc","F","#ff3333"], ["#e65c00","G","#19a3ff"], ["#2e5cb8","H","#d1a347"], ["#800080","I","#7fff7f"], ["#663300","J","#99ccff"], ["#ff8080","K","#007f7f"], ["#00802b","L","#ff7fd4"], ["#008080","M","#ff7f7f"], ["#800000","N","#7fffff"], ["#666699","O","#999966"], ["#cc9900","P","#3366ff"]];
    startMenu(colList);
    var gameMap = praiseJibbers();

     gameMap[5].lockLife = 5;
     gameMap[3].cInverse = "#fff";
     gameMap[3].lockLife = 5;

    var g = mPreview.getContext("2d");
    g.scale(.15, .15);
    render(g, gameMap, {fog: false, colourblind: true, debug: false});
})();