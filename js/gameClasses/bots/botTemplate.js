class yourBotName extends bot{
    //REQUIRED FUNCTIONS BELOW*************
	constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
	}
	makeMove(map, teams){
		//Decide your move here!
		//Receives map and list of teams
		//Return reference to planet you wish to act on
	
	}
	onGameStart(map, teams){
		//This function does not have to do anything, just make sure it is present
		//Decide your gameplan before the game begins here!
	}
	mapUpdate(map, teams, action){
		//This function does not have to do anything, just make sure it is present
		//Decide what to do about moves being made here!
		/** the action parameter is passed as an object containing:
		 * action = {
		 * 	type: non-prod mode("Capture", "Attack", "Shield"), prod mode("Capture", "Attack", "Defense")
		 * 	attacker: reference of player who made the move
		 * 	target: reference to planet that was affected
		 * 	defender: reference to player who owned the planet before the move
		 * }
		 */
	}
	//END OF REQUIRED FUNCTIONS************

	//Any other functions you choose
}