
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const FaceMesh = require('FaceMesh');
const Materials = require('Materials');
const Textures = require('Textures');
const Reactive = require('Reactive');
const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const CameraInfo = require('CameraInfo');
const Patches = require('Patches');
const Random = require('Random');
// const DeviceMotion = require('DeviceMotion');
const Time = require('Time');
const Instruction = require('Instruction');
// Diagnostics.log(Instruction);

const planeTracker = Scene.root.find('planeTracker0');
const movingObj = Scene.root.find('movingObj');
const coursor = Scene.root.find('coursor');



var instructionTap;
const midlePoint = Reactive.point2d(Patches.getScalarValue('sizeX'),Patches.getScalarValue('sizeY'));

function coursorSetup(){
	coursor.hidden = false;

    planeTracker.trackPoint(midlePoint, 'BEGAN');	

	instructionTap  = planeTracker.confidence.monitor({ fireOnInitialValue: true}).subscribe(
		function (e) {	
			switch(e.newValue) {

				case 'HIGH':
					Materials.get('coursor_mat').diffuse = Textures.get('pyramid_step3');

					break;

				case 'MEDIUM':
					Materials.get('coursor_mat').diffuse = Textures.get('pyramid_step2');

					break;

				case 'LOW':
					Materials.get('coursor_mat').diffuse = Textures.get('pyramid_step1');

					break;
			}
	 });
}



var backTap = TouchGestures.onTap().subscribe(function(gist){
	if(!placed) {
		tapCount++;
	}
	coursor.hidden = true;
    planeTracker.trackPoint(midlePoint, "ENDED");
}
