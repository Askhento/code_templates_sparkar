function getTranformFromNames(namesList, root){
	
	const objTree = getTreeFromNames(namesList, root);
	var transformSignal = objTree[objTree.length - 1].transform.toSignal();

	for (let i = objTree.length - 2; i >= 0; i--) {
		transformSignal = objTree[i].transform.toSignal().applyTo(transformSignal);
	}
	return transformSignal;
}

function getTreeFromNames(namesList, root) {
	var parent;
	if(root != null){
		parent = root.child(namesList[0]);
	} else {
		parent = Scene.root.find(namesList[0]);
	}
	const objArray = [parent];

	for (let i = 1; i < namesList.length; i++) {
		const child = parent.child(namesList[i]);
		objArray.push(child);
		parent = child;
	}

	return objArray;
}
function signalDimention(signal){
	let dimention = 0;

	if(signal.x != null){
		dimention++;
	} else {
		return dimention;
	}

	if(signal.y != null){
		dimention++;
	} else {
		return dimention;
	}

	if(signal.z != null){
		dimention++;
	} else {
		return dimention;
	}
	return dimention;
}