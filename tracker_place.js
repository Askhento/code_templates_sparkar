var container = Scene.root.find('container')
var planeTracker = Scene.root.find('planeTracker0');


TouchGestures.onTap().subscribe(function(gesture) {
	walkDriver.reset();
	walkDriver.start();

	loopDriver.stop();
	loopDriver.reset();
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = container.transform.scaleX.pinLastValue();
	container.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = container.transform.scaleY.pinLastValue();
	container.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = container.transform.scaleZ.pinLastValue();
	container.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(container.child('simple_box')).subscribe(function(gesture) {
  var lastRotationY = container.transform.rotationY.pinLastValue();
  container.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});