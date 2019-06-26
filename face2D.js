
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Audio = require('Audio');
const Random = require('Random');
const Reactive = require('Reactive');

function getRand(low, high){
	return Random.random()*(high-low) + low;
}
function getRandInt(low, high){
	return Math.floor(Random.random()*(high-low) + low);
}



const faceVector = Reactive.vector(
	face.cameraTransform.position.x,
	face.cameraTransform.position.y,
	face.cameraTransform.position.z
);


const facePlane = faceVector.mul(-54).div(face.cameraTransform.position.z);
const face2D = Reactive.point(
	facePlane.x,
	facePlane.y,
	0
);

const nullo = Scene.root.find('null');
nullo.transform.position = face2D;


Diagnostics.watch('faceZ = ', face.cameraTransform.position.z);

Diagnostics.watch('face2D.x =', face2D.x);
Diagnostics.watch('face2D.y =', face2D.y);










