var adjectives = ["Acidic", "Allergenic", "Alphabetical", "Amazing", "Anaerobic", "Angry", "Annoyed", "Anonymous", "Baked", "Bald", "Barbaric", "Barking", "Beached", "Bent", "Besettled", "Big-Balled", "Bitchy", "Bleached", "Blind", "Bloated", "Blue", "Bossy", "Brave", "Broken", "Burnt", "Carnivorous", "Caustic", "Cheeky", "Coarse", "Comatose", "Crazy", "Cremated", "Crispy", "Crooked", "Crunched", "Crushed", "Crusty", "Curly", "Cute", "Cylindrical", "Dancing", "Dead", "Deadly", "Decaying", "Deformed", "Destructive", "Disappointed", "Distressed", "Divine", "Dorky", "Drowned", "Drowsy", "Dull", "Eager", "Evaporated", "Evil", "Excited", "Explosive", "Exuberant", "Feeble", "Fizzy", "Flammable", "Flappy", "Floating", "Flooded", "Floury", "Flowery", "Fluffy", "Fluorescent", "Flying", "Folded", "Forked", "Fossilised", "Foul", "Fried", "Fuzzy", "Gassy", "Ghastly", "Giant", "Glowing", "Greasy", "Green", "Greivous", "Hairy", "Hampered", "Happy", "Hellish", "Hideous", "Horrendous", "Hot", "Humid", "Humming", "Hungry", "Ignorant", "Impregnated", "Incendiary", "Indecisive", "Infected", "Intoxicated", "Invisible", "Iridescent", "Jittery", "Jovial", "Juicy", "Kind", "Kinky", "Killable", "Ladelled", "Lame", "Lamenting", "Lavish", "Littering", "Loitering", "Loud", "Lounging", "Lovely", "Lumpy", "Luscious", "Magenta", "Messy", "Moist", "Moldy", "Moly", "Monstrous", "Morbid", "Murderous", "Musical", "Nescient", "Neutral", "Nuclear", "Numerous", "Obese", "Oily", "Orange", "Outlandish", "Petrified", "Pink", "Plump", "Porky", "Positive", "Prograde", "Progressive", "Purple", "Quaint", "Quiet", "Queefing", "Raging", "Recalcitrant", "Red", "Regressive", "Retarded", "Retrograde", "Ripe", "Roasted", "Salty", "Satanic", "Scorched", "Scrambled", "Seared", "Searing", "Sexy", "Silent", "Sinister", "Sleepy", "Slimy", "Slippery", "Sly", "Smug", "Soggy", "Sour", "Spacious", "Special", "Spicy", "Spiky", "Spooned", "Steamy", "Stinky", "Stupendous", "Stupid", "Sweet", "Swift", "Tenacious", "Thicc", "Thick", "Tight", "Toxic", "Tubular", "Undulating", "Unprecedented", "Unpredictable", "Venomous", "Vicious", "Violent", "Violet", "Viscious", "Vomiting", "Vulgar", "Warped", "Whimsical", "Whistling", "Windy", "Wobbly", "Yapping", "Yawning", "Yelling", "Yellow", "Yodelling", "Zapping", "Zipping", "Zooming", ""];
var nouns = ["Bird", "Walrus", "Platypus", "Cactus", "LightBulb", "Table", "Chair", "Hotdog", "Fish", "Eyeball", "Balloon", "Couch", "Guts", "Belly", "Nipple", "Foot", "Donkey", "Pillow", "Brick", "Bucket", "Head", "Sock", "Shirt", "Toe", "Toilet", "Water", "Flower", "Bee", "Egg", "Dinosaur", "UFO", "Skeleton", "Alien", "Bottle", "Cloud", "Insect", "Toenail", "Beetle", "Rug", "Soda", "Bell", "Broom", "Door", "Noose", "Nose", "Button", "Earlobe", "Tongue", "Whisker", "Mower", "Umbrella", "Eyelash", "Bladder", "Pencil", "Lamb", "Lung", "Eyesocket", "Paper", "Chickpea", "Hen", "Bologna", "Desert", "Tick", "Feather", "Eyelid", "Retina", "Bullet", "Key", "Box", "Plant", "Gums", "Bag", "Bowl", "Knife", "Fork", "Spoon", "Desk", "Socket", "Wrench", "Bolt", "Mug", "Spade", "Shovel", "Beluga", "Whale", "Square", "Oval", "Triangle", "Rectangle", "Dodecagon", "Polyhedron", "Parchment", "Shoe", "Tile", "Kidney", "Liver", "Nugget", "Hellian", "Stone", "Boulder", "Rock", "Telephone", "Spaceship", "Tomato", "Cucumber", "Apple", "Pear", "Orange", "Cherry", "Blueberry", "Potato", "Car", "Truck", "Mountain"];
var premades = ["Godzilla", "Chickenlips", "Hound", "Canal", "Bladder", "Fogbag", "ArsenicSulfide", "VeggieMonster", "BleachSoda", "OohAh", "BrickBurrito", "Yardbird", "Treebranch", "Cowbag", "BloodyEye", "Diablo", "UncircumcisedBook", "GasBag", "FartHammer", "SpellcastingSaltlick", "Whisker", "NosePicker", "PoopSlogga", "PeaKnuckle", "WindyBologna", "BlisteredSealion", "RupturedWenis", "RoastedGuineaPig", "GenbelNublis", "Sh**Drawers", "DrownedFish", "HumiliatedBellpepper", "DeerMouse", "Fleabag", "BoulderHolder", "MeatCarcass", "UrBootieHole", "PwnBag", "BagBag", "BagSack", "Winnifred", "HarvestMoon", "Bonebag", "CreeperPerro", "Prober", "Furbag", "Foghorn", "McProbe", "ThatOneBot", "ScaryTerry", "Maste", "ProbablyBad", "TurtleBob", "CrayCray", "Daishar", "thedudette", "MrsWayTooClose", "BumbleBee", "Zimmittens", "WeLive", "ButterTits", "TylerNubcs", "BunBun", "WagWag", "cOrncOb", "Noobro"];

function removeAtIndex(arr, index){
	var clipped = [];
	for (var r = 0; r < arr.length; r++){
		if(r != index){
			clipped.push(arr[r]);
		}
	}
	return clipped;
}
function removeItem(arr, item){
	var clipped = arr;
	for (var r=0; r< clipped.length; r++){
		if(clipped[r] == item){
			clipped = removeAtIndex(clipped, r);
			r=0;
		}
	}
	return clipped;
}
function removeDupes(arr){
	var filtered = arr.filter(function(item, pos) {
			return arr.indexOf(item) == pos;
		})
	return filtered;
}
function findLength(p0,p1, coords){
	var x = coords[p0][0] - coords[p1][0];
	var y = coords[p0][1] - coords[p1][1];
	return Math.sqrt(x*x + y*y);
}
function findAngle(p0,p1,p2, coords){
	var x1 = coords[p1][0]- coords[p0][0];
	var y1 = coords[p1][1]- coords[p0][1];
	var x2 = coords[p2][0]- coords[p0][0];
	var y2 = coords[p2][1]- coords[p0][1];
	return Math.acos((x1*x2+y1*y2)/(findLength(p0,p1, coords)*findLength(p0,p2, coords)));
}