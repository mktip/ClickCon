(function(){
    var colList = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00cccc", "#e65c00", "#2e5cb8", "#800080","#663300", "#ff8080","#00802b", "#008080","#800000","#666699","#cc9900"];
    startMenu(colList);
    var gameMap = [new planeto(0, 10, 10, [1, 2]),
     new planeto(1, 10, 100, [0, 3]), 
     new planeto(2, 100, 10, [0, 3]),
     new planeto(3, 100, 100, [1, 2])];

     gameMap[0].setUp({teamId: 1, ownerId: 1, colour:"#f00", teamColour:"#f00"});
     gameMap[1].setUp({teamId: 1, ownerId: 1, colour:"#f00", teamColour:"#f00"});

    var g = mPreview.getContext("2d");
    render(g, gameMap, {fog: false});
})();