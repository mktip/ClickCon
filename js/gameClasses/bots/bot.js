class bot extends player{ //Ensure class name is your bot name, and extends bot
	constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
	}
	//REQUIRED FUNCTIONS BELOW*************
	makeMove(){
		//Decide your move here!
	}
	onGameStart(){
		//Decide your gameplan before the game begins here!
	}
	mapUpdate(){
		//Decide what to do about moves being made here!
	}
	//END OF REQUIRED FUNCTIONS************

	//Any other functions you choose
}