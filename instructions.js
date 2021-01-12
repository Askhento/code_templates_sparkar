// wrapper for INSTRUCTIONS 
const Instruction = require('Instruction');

let instrucitonTimerSub;
function setInstruction(time, token){
	Instruction.bind(true, token);

	if(time != null){
        instrucitonTimerSub = T.setTimeout(
            () => {
                Instruction.bind(false, token);				               
            },
            time
        )
	}
}
function clearInstruction(){
	instrucitonTimerSub.unsubscribe();
	Instruction.bind(false, '');
}