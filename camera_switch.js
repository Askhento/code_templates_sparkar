const Instruction = require('Instruction');
const Time = require('Time');


var instructionTimer;
function setInstruction(time, token){

	if(instructionTimer != null){
		Time.clearTimeout(instructionTimer);
	}

	Instruction.bind(true, token);
	if(time != null){
 	instructionTimer = Time.setTimeout(
		function(){
			Instruction.bind(false, token);
		}, time);
 	}
}
function clearInstruction(){
	if(instructionTimer != null){
		Time.clearTimeout(instructionTimer);
	}
	Instruction.bind(false, '');
}
CameraInfo.captureDevicePosition.monitor({fireOnInitialValue: true}).subscribe(
	function(pos){
		switch(pos.newValue) {

			case 'FRONT':
				// Diagnostics.log('front!');
				setInstruction(3000, 'raise_eyebrows');
				frontSetup();
				backReset();
				break;

			case 'BACK':
				// Diagnostics.log('back!');
		 		cameraSwitched = true;
				setInstruction(3000, 'tap_to_place');
				backSetup();
				frontReset();
				break;
		}		
	});
