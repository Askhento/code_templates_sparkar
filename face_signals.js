const focalDistance = -Scene.root.find('Focal Distance').transform.z.pinLastValue();


function addPoints(p1, p2, scale){
	if(scale == null) {
		scale = 1;
	}
	const x = p1.x.add(p2.x);
	const y = p1.y.add(p2.y);
	const z = p1.z.add(p2.z);
	return R.point(x.mul(scale), y.mul(scale), z.mul(scale));
}



function facePoint2Focal(face, point){
	return face.cameraTransform.applyTo(point).add(R.vector(0,0,focalDistance));
}


// face signals 

const face0 = FaceTracking.face(0);

// pucker lips

const rightCornerMouth = face0.mouth.rightCorner;
const leftCornerMouth = face0.mouth.leftCorner;
const cornerMouthDistance = R.sub(rightCornerMouth.x, leftCornerMouth.x).abs();

const PUCKER_THRESHOLD_LOW = 3.4;
const PUCKER_THRESHOLD_HIGH = 3.8;

const puckerSignal = R.schmittTrigger(cornerMouthDistance, { low: PUCKER_THRESHOLD_LOW, high: PUCKER_THRESHOLD_HIGH}).not();


// mouth points


const MOUTH_OBJECT_CONFIG = {
	childs : [mouthObject.child('heart_mesh'), mouthObject.child('text')],
	insideMouthZ : -10,
	outsideMouthZ : 10,
	outsideMouthY : 5,
	getOutTime : 1000,
}


const mouthCenter = addPoints(leftCornerMouth, rightCornerMouth, .5);

const mouthCenterFD = facePoint2Focal(face0, mouthCenter);
const mouthInsideFD = facePoint2Focal(face0, mouthCenter.add(R.vector(0,0,MOUTH_OBJECT_CONFIG.insideMouthZ)));
const mouthOutsideFD = facePoint2Focal(face0, mouthCenter.add(R.vector(0,0,MOUTH_OBJECT_CONFIG.outsideMouthZ))).add(R.vector(0,MOUTH_OBJECT_CONFIG.outsideMouthY,0));

