
const D = require('Diagnostics');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const R = require('Reactive');

// This code need update for async functions!!!


// const container = Scene.root.find('container')
const planeTracker = Scene.root.find('planeTracker0');
const box = Scene.root.find('box');

D.log(planeTracker);


TouchGestures.onTap(planeTracker).subscribe(
	function(gesture){
		const hitPoint3D = planeTracker.hitTest(gesture.location);
		D.log(hitPoint3D);
		box.transform.position = R.point(hitPoint3D.x, hitPoint3D.y, hitPoint3D.z);
	});



TouchGestures.onPan(Scene.root.find('Cube')).subscribe(
	function(gesture){
		const screenLocation = R.pack2(gesture.location.x, gesture.location.y);
		const hitPoint3D = planeTracker.hitTest(screenLocation);
		D.log(hitPoint3D);
		box.transform.position = R.point(hitPoint3D.x, hitPoint3D.y, hitPoint3D.z);
	});
