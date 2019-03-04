function addPlayer(parent, child){
    if(colList.length > 0){
		var name = adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
		var tst = document.createTextNode(name);
		var killbtn = document.createElement("button");
		killbtn.id = "pnodekiller" + pCount;
		var rip = document.createTextNode("X");
		killbtn.appendChild(rip);
		killbtn.addEventListener("click", function(event){event.preventDefault(); colList.push(this.parentNode.style.color); var par = this.parentNode; par.parentNode.removeChild(par); pCount -= 1;});
		pID = "playerNode" + pCount;
		child.id = pID;
		child.appendChild(tst);
		child.appendChild(killbtn);
		child.style.color = colList[0];
		colList = removeAtIndex(colList, 0);
		parent.appendChild(child);
		pCount += 1;
	}
    appendItem(parent, child);
}
function remPlayer(){

}
function appendItem(parent, child){
    parent.appendChild(child);
}