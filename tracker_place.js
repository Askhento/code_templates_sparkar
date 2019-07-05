
const D = require('Diagnostics');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const R = require('Reactive');
const Time = require('Time');
const Animation = require('Animation');

// const S = require('Shaders');


const container = Scene.root.find('container')
const planeTracker = Scene.root.find('planeTracker0');
// const grid = Scene.root.find('grid');

// // TAP & ARROW PLANES 

// const controls = container.find('controls');
// const upArrow = controls.find('up_arrow');
// const downArrow = controls.find('down_arrow');
// const tap = controls.find('tap');
// const hand = tap.find('hand');
// const circle0 = tap.find('circle0');
// const circle1 = tap.find('circle1');


// const tapHideDriver = Animation.timeDriver({
// 	durationMilliseconds: 500,
// 	loopCount: 2,
// 	mirror: true
// });
// tapHideDriver
// 	.onAfterIteration()
// 	.subscribe(
// 		function(loopCount){
// 			if(!tapped) {
// 				tapHideDriver.stop();
// 			}

// 			if(loopCount == 2){
// 				tap.hidden = true;
// 			}
// 		});
// hand.material.opacity = Animation.animate(tapHideDriver, Animation.samplers.easeOutQuad(-0.1, 1));
// circle0.material.opacity = hand.material.opacity;
// circle1.material.opacity = hand.material.opacity;


// var tapSub;
// let tapSwitch = false;
// var panMonitor;
// let tapped = false;
// let panned = false;

// // CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - - CONTROLL PANEL - -
// var panSubContainer = TouchGestures.onPan(container.child('simple_box')).subscribeWithSnapshot(
// 	{'lastY':container.transform.position.y},
// 	function(gesture, snap) {
// 		if(tapSwitch){
// 			container.transform.position = R.point(
// 				0,
// 				gesture.translation.y.mul(-.05).add(snap.lastY),
// 				0
// 			);

// 		} else {
// 			planeTracker.trackPoint(gesture.location, gesture.state);
// 			grid.material.diffuseTextureTransform.offsetU = container.worldTransform.position.x.div(50);
// 			grid.material.diffuseTextureTransform.offsetV = container.worldTransform.position.y.div(-50);

// 			if(!tapped && !panned) {
// 				if(panMonitor != null) {
// 					panMonitor.unsubscribe();
// 				}
// 				panMonitor = gesture.state.monitor().subscribe(
// 					function(val){
// 						if(val.newValue == 'ENDED') {
// 							tapHideDriver.start();
// 							panned = true;

// 						}
// 					});				
// 			}		
// 		}
// 	});


// tapSub = TouchGestures.onTap(container.child('simple_box')).subscribe(
// 	function(gesture) {
// 		tapSwitch = !tapSwitch;
// 		upArrow.hidden = !tapSwitch;
// 		downArrow.hidden = !tapSwitch;

// 		if(panned && !tapped) {
// 			tapHideDriver.start();
// 		}
// 		tapped = true;

// });	


const container = Scene.root.find('container')
const planeTracker = Scene.root.find('planeTracker0');

TouchGestures.onPan(container.child('simple_box')).subscribe(
	function(gesture){
		planeTracker.trackPoint(gesture.location, gesture.state);
	});


TouchGestures.onTap(planeTracker).subscribe(
	function(gesture){
		planeTracker.trackPoint(gesture.location);
		container.transform.position = R.point(0,0,0);
		container.transform.scaleX = .5;
		container.transform.scaleY = .5;
		container.transform.scaleZ = .5;
		container.transform.rotationY = 0;
	});

TouchGestures.onPinch().subscribe(function(gesture) {
	const lastScaleX = container.transform.scaleX.pinLastValue();
	container.transform.scaleX = R.mul(lastScaleX, gesture.scale);

	const lastScaleY = container.transform.scaleY.pinLastValue();
	container.transform.scaleY = R.mul(lastScaleY, gesture.scale);

	const lastScaleZ = container.transform.scaleZ.pinLastValue();
	container.transform.scaleZ = R.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(container.child('simple_box')).subscribe(function(gesture) {
  const lastRotationY = container.transform.rotationY.pinLastValue();
  container.transform.rotationY = R.add(lastRotationY, R.mul(-1, gesture.rotation));
});