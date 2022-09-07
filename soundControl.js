const D = require("Diagnostics");
const R = require("Reactive");
const Sc = require("Scene");
const Au = require("Audio");
const A = require("Animation");

export class SoundControl {
	constructor({ name, smoothness, volumeMin, volumeMax }) {
		this.name = name;
		this.smoothness = smoothness ? smoothness : 0;
		this.volumeMin = volumeMin ? volumeMin : 0;
		this.volumeMax = volumeMax ? volumeMax : 1;
		this.volumeDriver = null;

		this.ctrl = null;
		this.speaker = null;
		this.isPlaying = false;
	}

	async init() {
		if (!this.name) return { msg: "Need a name!", code: -1 };
		const speakerName = this.name + "_speaker";
		const ctrlName = this.name + "_controller";
		this.ctrl = await Au.getAudioPlaybackController(ctrlName);
		if (!this.ctrl)
			return { msg: "Controll not found : " + ctrlName, code: -1 };
		this.speaker = await Sc.root.findFirst(speakerName);
		if (!this.speaker)
			return { msg: "Speaker not found : " + speakerName, code: -1 };

		this.volumeDriver = A.timeDriver({
			durationMilliseconds: this.smoothness,
		});
		this.speaker.volume = A.animate(
			this.volumeDriver,
			A.samplers.linear(this.volumeMin, this.volumeMax)
		).expSmooth(this.smoothness);
		return { msg: "Sound control inited " + this.name, code: 1 };
	}

	play() {
		this.reset();
		this.ctrl.setLooping(false);
		this.ctrl.setPlaying(true);
		if (!this.isPlaying) this.volumeDriver.start();
		this.isPlaying = true;
	}

	stop() {
		// this.ctrl.setLooping(false);
		// this.ctrl.setPlaying(false);
		if (this.isPlaying) this.volumeDriver.reverse();
		this.isPlaying = false;
	}

	loop() {
		this.reset();
		this.ctrl.setLooping(true);
		this.ctrl.setPlaying(true);
		if (!this.isPlaying) this.volumeDriver.start();
		this.isPlaying = true;
	}

	reset() {
		this.ctrl.reset();
	}
}
