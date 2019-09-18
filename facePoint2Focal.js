
const focalDistance = -Scene.root.find('Focal Distance').transform.z.pinLastValue();


function facePoint2Focal(face, point){
	return face.cameraTransform.applyTo(point).add(R.vector(0,0,focalDistance));
}