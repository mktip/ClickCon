class bot extends player { //Ensure class name is your bot name, and extends bot
    constructor(id, team, name, colour, isBot) {
        super(id, team, name, colour, isBot);
    }

    //REQUIRED FUNCTIONS BELOW*************
    makeMove() {
        this.moveCount++;
        console.log(`${this.name} made a move. Count: ${this.moveCount}`);
        //Decide your move here!
    }

    // Here

    generateMST(map) {
        if (this.mst) return;

        let visited = Set();
        assert(map.planets.filter(o => o.owner.id == this.id) == 1);

        const starting_planet = map.planets.filter(o => o.owner.id == this.id)[0];

        visited.push(starting_planet);

        while (visited.size < map.planets.length) {
            let minEdge = null;

            for (const vertex of visited) {
                const edges = this.edges[vertex];
                for (const edge of edges) {
                    if (!visited.has(edge.vertex) && (!minEdge || edge.weight < minEdge.weight)) {
                        minEdge = edge;
                    }
                }
            }

            if (minEdge) {
                this.mst.push(minEdge);
                visited.add(minEdge.vertex);
            }
        }
    }


    onGameStart() {
        //Decide your gameplan before the game begins here!
    }

    mapUpdate() {
        //Decide what to do about moves being made here!
    }

    //END OF REQUIRED FUNCTIONS************

    //Any other functions you choose
}