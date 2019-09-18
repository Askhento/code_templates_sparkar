



// setting up emitter

const mouthEmitter = Scene.root.find('mouthEmitter');

const sizeModifier = A.samplers.easeOutQuad(0, 2);
mouthEmitter.sizeModifier = sizeModifier;

const colorsArray = A.samplers.easeOutQuad([0,0,0,0], [0,0,0,1]);
const alphaSampler = A.samplers.HSVA(colorsArray);

mouthEmitter.colorModulationHSVA = R.HSVA(1,1,1,-1);
mouthEmitter.hsvaColorModulationModifier = alphaSampler;



// emmit one

var emitterTimer;
function emitOne(emmiter){
	if(emitterTimer != null) {
		emitterTimer.unsubscribe();
	}

	emmiter.birthrate = 1;
	emitterTimer = T.setTimeout(
		function(){
			emitterTimer.unsubscribe();
			emmiter.birthrate = 0;
		}, 1200);
}
