class aphidBot extends bot{
	constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
	}
	makeMove(map, teams){
		
	}
	onGameStart(map, teams){
		
	}
	mapUpdate(map, teams, action){
		
	}

    //Determine best area to start in using heatmap strategy
    //Account for other players getting too big
    //Account for other players hitting us too many times and fight back
    //Account for targeting specific smaller players near us to kill them off
    //Account for boneys
    //Attempt to find choke points
    //When biggest, look to kill smallest players off first, except when all players are equivalent
	
}