const I = require("Instruction");
const Time = require("Time");
const CI = require("CameraInfo");

let instructionTimer;
function setInstruction(time, token) {
	if (instructionTimer != null) {
		Time.clearTimeout(instructionTimer);
	}

	I.bind(true, token);
	if (time != null) {
		instructionTimer = Time.setTimeout(function () {
			I.bind(false, token);
		}, time);
	}
}
function clearInstruction() {
	if (instructionTimer != null) {
		Time.clearTimeout(instructionTimer);
	}
	I.bind(false, "");
}

function frontSetup() {}

function frontReset() {}

CI.captureDevicePosition
	.monitor({ fireOnInitialValue: true })
	.subscribe(function (pos) {
		switch (pos.newValue) {
			case "FRONT":
				// Diagnostics.log('front!');
				frontSetup();
				backReset();
				break;

			case "BACK":
				// Diagnostics.log('back!');
				cameraSwitched = true;
				backSetup();
				frontReset();
				break;
		}
	});
