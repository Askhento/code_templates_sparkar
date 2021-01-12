
// = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===
//    PRATICLE ALPHA        PRATICLE ALPHA      PRATICLE ALPHA        PRATICLE ALPHA      PRATICLE ALPHA        PRATICLE ALPHA      
// = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===

const EMITTERS_COUNT = 5;
const emitters = [];
const colorsArray = A.samplers.sequence({
    samplers: [
        A.samplers.easeInQuart([0, 0, 0, 0], [0, 0, 0, 1]),
        A.samplers.constant([0, 0, 0, 1]),
        A.samplers.easeInQuart([0, 0, 0, 1], [0, 0, 0, 0])
    ]
});


const alphaSampler = A.samplers.HSVA(colorsArray);

for (let i = 0; i < EMITTERS_COUNT; i++) {
    emitters.push(Scene.root.find('emitter' + i));
    emitters[i].hsvaColorModulationModifier = alphaSampler;
    emitters[i].colorModulationHSVA = R.HSVA(0, 0, 1, -1);
}

// = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===
//    PRATICLE ALPHA        PRATICLE ALPHA      PRATICLE ALPHA        PRATICLE ALPHA      PRATICLE ALPHA        PRATICLE ALPHA      
// = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===   = = =  ===
