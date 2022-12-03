class yourBotName extends bot{
    //REQUIRED FUNCTIONS BELOW*************
	constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
	}
	makeMove(map){
		//Decide your move here!
		//Additionally, the bot is passed the list of teams, which also contain the lists of players
		//Receiving at least the game map is recommended
	}
	onGameStart(map){
		//Decide your gameplan before the game begins here!
	}
	mapUpdate(map, action){
		//Decide what to do about moves being made here!
	}
	//END OF REQUIRED FUNCTIONS************

	//Any other functions you choose
}