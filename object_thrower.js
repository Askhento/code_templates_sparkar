// throw some objects on the screen using shuffle bag


function knuthShuffle(arr) {
	var rand, temp, i,last;
	last=arr[arr.length-1];
	for (i = arr.length - 1; i > 0; i -= 1) {
		rand = Math.floor((i + 1) * Math.random()); //get random between zero and i (inclusive)
		temp = arr[rand]; //swap i and the zero-indexed number
		arr[rand] = arr[i];
		arr[i] = temp;
	}
	if(last===arr[0])
	{
		temp=arr[0];
		const randInd=Math.round(getRand(1,arr.length-1))
		arr[0]=arr[randInd];
		arr[randInd]=temp;
	}
	return arr;
}


function throwSome(difficulty, startX){
    if(!throwables.isEmpty()) {
        const freeObjectIndex = throwables.shift();
        const freeObject = fallObjects[freeObjectIndex];
        freeObject.genAnim(difficulty, startX);   
    }
}




var objectThrowerSub;

function setThrower(time){
	objectThrowerSub = Time
		.setTimeoutWithSnapshot(
			{
				difficulty : difficultySpeedY,
				time : difficultyTime
			},
			function(val, snap){
				objectThrowerSub.unsubscribe();

				const numOfThrows = Math.floor(getRand(1, 3));
				const positionsArray = [];


				for (let i = -NUM_OF_PLACES_X; i < NUM_OF_PLACES_X + 1; i++) {
					positionsArray.push(i);	
				}				
				// D.log('positionsArray = ' + positionsArray);

				const shuffledPositions = knuthShuffle(positionsArray);


				// D.log('scalerToScreen = ' + scalerToScreen);
				for (let i = 0; i < numOfThrows; i++) {
					throwSome(snap.difficulty, shuffledPositions[i] / scalerToScreen);		
				}

				setThrower(snap.time * 1.5);
			}, time);
}
