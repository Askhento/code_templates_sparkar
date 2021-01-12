
const D = require('Diagnostics');
const Sc = require('Scene');
const TG = require('TouchGestures');


function hideObjects(alist){
	if(alist.length){
		for (let i = 0; i < alist.length; i++) {
			alist[i].hidden = true;
		}
	} else if(alist){
		alist.hidden = true;
	} else {
		return -1;
	}
}

function showObjects(alist){
	if(alist.length){
		for (let i = 0; i < alist.length; i++) {
			alist[i].hidden = false;
		}
	} else if(alist){
		alist.hidden = false;
	} else {
		return -1;
	}
}
// SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - 
/*

	                    tap0                     tap1                           tap100500           
	const names = [['objA0', .. 'objA999'], ['objB0', .. 'objB999'] , ..... ['objZ0', .. 'objZ999']];
*/

const names = [['lif_words'], ['lif_blue'], ['lif_lions']];

// SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - SPECIAL STRING - - 

const obj = [];
for (let i = 0; i < names.length; i++) {
	obj.push([]);
	for (var j = 0; j < names[i].length; j++) {
		obj[i].push(Sc.root.find(names[i][j])); 
	}
}

//default obj
let tapCount = 0;
showObjects(obj[tapCount]);

TG
	.onTap()
	.subscribe(
		function(){
			hideObjects(obj[tapCount]);
			tapCount++;
			if(tapCount >= names.length){
				tapCount = 0;
			}
			showObjects(obj[tapCount]);
		});



