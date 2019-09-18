function getRand(low, high){
	return Math.random()*(high-low) + low;
}
function getRandInt(low, high){
	return Math.floor(Math.random()*(high-low) + low);
}

function getSign(){
	return Math.round(Math.random()) * 2 - 1;
}

function sawToooth(progress){
	return R.sub(1, R.sub(1, R.mul(2, progress)).abs());
}