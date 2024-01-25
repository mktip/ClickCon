class ourBot extends bot {

  constructor(id, team, name, colour, isBot) {
    super(id, team, name, colour, isBot);
  }

  makeMove(map, _teams) {
    let clusterBot = new clusterGuard(this.id, this.team, this.name + "'s Bot", this.colour, true)
    let move = clusterBot.makeMove(map)
    return move
  }

  onGameStart(map) {

  }
  mapUpdate(map, action) {

  }
}
