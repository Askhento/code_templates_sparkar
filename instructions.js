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