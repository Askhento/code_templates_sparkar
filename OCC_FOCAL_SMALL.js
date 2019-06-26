const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Reactive = require('Reactive');

function toRad(ang) {
	return ang * Math.PI / 180;
}


const occ = Scene.root.find('occ');
const face = FaceTracking.face(0);

// this is always 54
let FOCAL_DIST = 54;
// actual distance from camera
let OCC_DIST = 10;


// vector for locating facemesh
const faceVectorNorm = Reactive.vector(
	face.cameraTransform.position.x,
	face.cameraTransform.position.y,
	face.cameraTransform.position.z
	).normalize().mul(OCC_DIST).add(Reactive.vector(0,0, FOCAL_DIST)); 


occ.transform.position = Reactive.point(
	faceVectorNorm.x,
	faceVectorNorm.y,
	faceVectorNorm.z
	);

occ.transform.rotationX = face.cameraTransform.rotationX;
occ.transform.rotationY = face.cameraTransform.rotationY;
occ.transform.rotationZ = face.cameraTransform.rotationZ;


// calculating scale of facemesh
const scaleSignal = Reactive.div(OCC_DIST, face.cameraTransform.position.magnitude());

occ.transform.scaleX = scaleSignal;
occ.transform.scaleY = scaleSignal;
occ.transform.scaleZ = scaleSignal;