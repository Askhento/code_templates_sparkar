const D = require("Diagnostics");
const R = require("Reactive");
const TG = require("TouchGestures");
const CI = require("CameraInfo");
const Sc = require("Scene");

// const ptControl = new PlaneTrackerControls({
// 	containerName: "mainFrame",
// 	smoothness: 200,
// 	actions: {
// 		tap: false,
// 		pan: true,
// 		rotate: true,
// 		pinch: true,
// 	},
// 	bBox: false,
// 	manual: false,
// });

export class PlaneTrackerControls {
	constructor({
		containerName,
		smoothness,
		actions,
		planeTrackerName,
		manual,
		bBoxName,
	}) {
		this.containerName = containerName;
		this.smoothness = smoothness ? smoothness : 0;
		this.manual = manual ? manual : false;
		this.actions = actions;
		this.planeTrackerName = planeTrackerName
			? planeTrackerName
			: "planeTracker0";
		this.bBoxName = bBoxName;
		this.bBox = null;
		this.container = null;
		this.planeTracker = null;
		this.subs = {
			tap: null,
			pan: null,
			pinch: null,
			rotate: null,
		};
		this.middle = null;
		this.isTrackingMiddle = false;
	}

	async init() {
		if (!this.actions) return { msg: "Actions is missing!", code: -1 };

		this.planeTracker = await Sc.root.findFirst(this.planeTrackerName);
		if (!this.planeTracker)
			return { msg: "PlaneTracker not found!", code: -1 };
		this.container = await this.planeTracker.findFirst(this.containerName);
		if (!this.container) return { msg: "Container not found!", code: -1 };

		if (this.bBoxName)
			this.bBox = await this.container.findFirst(this.bBoxName);

		if (!this.manual)
			CI.captureDevicePosition
				.monitor({ fireOnInitialValue: true })
				.subscribe((pos) => {
					switch (pos.newValue) {
						case "FRONT":
							this.reset();
							break;
						case "BACK":
							this.setup();
							break;
					}
				});

		this.middle = R.point2d(
			CI.previewSize.width.mul(0.5).expSmooth(this.smoothness),
			CI.previewSize.height.mul(0.5).expSmooth(this.smoothness)
		);
		return { msg: "PlaneTracker initialized!", code: 0 };
	}

	setup() {
		if (this.actions.tap)
			this.subs.tap = TG.onTap().subscribe((gesture) => {
				// Instruction.bind(false, "")
				if (this.isTrackingMiddle) {
					this.stopTrackMiddle();
				} else {
					this.planeTracker.trackPoint(gesture.location);
				}
			});

		if (this.actions.pan)
			this.subs.pan = (
				this.bBox ? TG.onPan(this.bBox) : TG.onPan()
			).subscribe((gesture) => {
				const location = R.point2d(
					gesture.location.x.expSmooth(this.smoothness),
					gesture.location.y.expSmooth(this.smoothness)
				);
				if (this.isTrackingMiddle) {
					this.stopTrackMiddle();
				} else {
					this.planeTracker.trackPoint(location, gesture.state);
				}
			});

		if (this.actions.pinch)
			this.subs.pinch = (
				this.bBox ? TG.onPinch(this.bBox) : TG.onPinch()
			).subscribeWithSnapshot(
				{
					//The values we want to pass to the callback function at the time of the pinch gesture are the current x, y and z scale values of the container.transform. The reason we need to do this is because we want to change the scale (increase or decrease depending on the gesture) in relation to it's current scale.
					//A snapshot is a dictionary of signal values that can be accessed in the callback function by name.

					lastScaleX: this.container.transform.scaleX,
					lastScaleY: this.container.transform.scaleY,
					lastScaleZ: this.container.transform.scaleZ,
				},
				(gesture, snapshot) => {
					this.container.transform.scaleX = gesture.scale
						.mul(snapshot.lastScaleX)
						.expSmooth(this.smoothness);
					this.container.transform.scaleY = gesture.scale
						.mul(snapshot.lastScaleY)
						.expSmooth(this.smoothness);
					this.container.transform.scaleZ = gesture.scale
						.mul(snapshot.lastScaleZ)
						.expSmooth(this.smoothness);
				}
			);

		if (this.actions.rotate)
			this.subs.rotate = (
				this.bBox ? TG.onRotate(this.bBox) : TG.onRotate()
			).subscribeWithSnapshot(
				{
					lastRotationY: this.container.transform.rotationY,
				},
				(gesture, snapshot) => {
					//In the callback function we multiply the RotateGesture rotation by -1 before adding it to the container.transform to rotate the boombox. We multiply the gesture rotation by -1 to make sure the rotation happens in the correct direction.
					const correctRotation = gesture.rotation.mul(-1);
					this.container.transform.rotationY = correctRotation
						.add(snapshot.lastRotationY)
						.expSmooth(this.smoothness);
				}
			);
	}

	reset() {
		for (const [key, sub] of Object.entries(this.subs)) {
			if (sub) {
				sub.unsubscribe();
			}
		}
	}

	trackMiddle() {
		this.isTrackingMiddle = true;
		this.planeTracker.trackPoint(this.middle, "BEGAN");
	}
	stopTrackMiddle() {
		this.isTrackingMiddle = false;
		this.planeTracker.trackPoint(this.middle, "ENDED");
	}
}
