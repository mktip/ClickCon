(function(){
    var colList = [["#ff0000","A"], ["#00ff00","B"], ["#0000ff","C"], ["#ffff00","D"], ["#ff00ff","E"], ["#00cccc","F"], ["#e65c00","G"], ["#2e5cb8","H"], ["#800080","I"], ["#663300","J"], ["#ff8080","K"], ["#00802b","L"], ["#008080","M"], ["#800000","N"], ["#666699","O"], ["#cc9900","P"]];
    startMenu(colList);
    var gameMap = [new planeto(0, 30, 30, [1, 2]),
     new planeto(1, 30, 120, [0, 3]), 
     new planeto(2, 120, 30, [0, 3, 4]),
     new planeto(3, 120, 120, [1, 2, 5]),
     new planeto(4, 210, 30, [2, 5]),
     new planeto(5, 210, 120, [3, 4])];

     gameMap[0].setUp({teamId: 1, ownerId: 1, colour:"#f00", teamColour:"#f00"});
     gameMap[1].setUp({teamId: 1, ownerId: 2, colour:"#0f0", teamColour:"#f00"});
     gameMap[2].setUp({teamId: 2, ownerId: 3, colour:"#00f", teamColour:"#00f"});
     gameMap[3].setUp({teamId: 2, ownerId: 4, colour:"#ff0", teamColour:"#00f", hasShield: true});
     gameMap[4].setUp({teamId: 3, ownerId: 5, colour:"#f0f", teamColour:"#0f0"});

     gameMap[5].lockLife = 5;

    var g = mPreview.getContext("2d");
    render(g, gameMap, {fog: false});
})();