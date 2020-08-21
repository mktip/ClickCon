(function(){
    var colList = [["#ff0000","A"], ["#00ff00","B"], ["#0000ff","C"], ["#ffff00","D"], ["#ff00ff","E"], ["#00cccc","F"], ["#e65c00","G"], ["#2e5cb8","H"], ["#800080","I"], ["#663300","J"], ["#ff8080","K"], ["#00802b","L"], ["#008080","M"], ["#800000","N"], ["#666699","O"], ["#cc9900","P"]];
    startMenu(colList);
    var gameMap = mapConverter(testerMap());

     gameMap[5].lockLife = 5;
     gameMap[3].cInverse = "#fff";
     gameMap[3].lockLife = 5;

    var g = mPreview.getContext("2d");
    render(g, gameMap, {fog: false, colourblind: true, debug: false});
})();