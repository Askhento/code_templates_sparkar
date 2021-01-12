const A = require('Animation');
const Sc = require('Scene');

// This code need update for async functions!!!

// setting up emitter

const someEmitter = Sc.root.find('someEmitter');

const sizeModifier = A.samplers.easeOutQuad(0, 2);
someEmitter.sizeModifier = sizeModifier;

const colorsArray = A.samplers.easeOutQuad([0,0,0,0], [0,0,0,1]);
const alphaSampler = A.samplers.HSVA(colorsArray);

someEmitter.colorModulationHSVA = R.HSVA(1,1,1,-1);
someEmitter.hsvaColorModulationModifier = alphaSampler;



// emmit some particles during 1000 ms

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
		}, 1000);
}
