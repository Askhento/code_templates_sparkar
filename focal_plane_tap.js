
const plane = Scene.root.find('plane0');

const TouchGestures = require('TouchGestures');
const Scene = require('Scene');
const R = require('Reactive');

TouchGestures
	.onTap()
	.subscribe(
		(gesture) => {
			const focalPosition = Scene.unprojectToFocalPlane(R.point2d(gesture.location.x, gesture.location.y));
			plane.transform.x = focalPosition.x.neg();
			plane.transform.y = focalPosition.y;
			plane.transform.z = 0;
		}
	);