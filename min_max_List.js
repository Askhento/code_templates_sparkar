// get min/max signal from list of signals 

function minList(list){
    var oldElem = 0;
	for (let i = list.length - 1; i >= 0; i--) {
        const newElem = R.min(list[i], oldElem);
		oldElem = newElem;
	}
	return oldElem;
}

function maxList(list){
	var oldElem = 0;
	for (let i = list.length - 1; i >= 0; i--) {
		const newElem = R.max(list[i], oldElem);
		oldElem = newElem;
	}
	return oldElem;
}