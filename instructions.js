// wrapper for INSTRUCTIONS
const I = require("Instruction");
let instrucitonTimerSub;
function setInstruction(time, token) {
	I.bind(true, token);

	if (time != null) {
		instrucitonTimerSub = Time.setTimeout(() => {
			I.bind(false, token);
		}, time);
	}
}
function clearInstruction() {
	if (instrucitonTimerSub) instrucitonTimerSub.unsubscribe();
	I.bind(false, "");
}
