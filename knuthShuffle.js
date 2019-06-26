// SCPECIAL SHUFFLE TECHNIQUE

var shufflebag = (function iife() {
	var initialValues = [];
	var bag = [];

	function knuthShuffle(arr) {
		var rand, temp, i;

		for (i = arr.length - 1; i > 0; i -= 1) {
			rand = Math.floor((i + 1) * Math.random()); //get random between zero and i (inclusive)
			temp = arr[rand]; //swap i and the zero-indexed number
			arr[rand] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}
	function next() {
		if (bag.length === 0) {
			bag = [...initialValues];
			bag = knuthShuffle(bag);
		}
		return bag.pop();
	}	

	function init(values) {
    	initialValues = [...values];
	    return {
	      next: next
	    };
	}
	return {
		init: init
	};
}());
