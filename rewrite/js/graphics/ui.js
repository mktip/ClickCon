function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
}

function makeBlob(name){
    addElement((name+"blob"), "div", document.getElementById("masterDiv"), name);
}