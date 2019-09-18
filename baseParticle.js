// object class

const Particle = function(ind, config){
	const obj = Scene.root.find(config.baseName + ind);
	const materials = [];
	for (let i = 0; i < config.materials.length; i++) {
		materials.push(Materials.get(config.materials[i] + ind));
	}

	function start(targets, snap){
		
	}
	this.start = start;

	function setScale(scale){
		obj.transform.scaleX = scale;
		obj.transform.scaleY = scale;
		obj.transform.scaleZ = scale;
	}

	function setOpacity(opacity){
		for (let i = 0; i < materials.length; i++) {
			materials[i].opacity = opacity;
		}
	}

	function setPosition(pos){
		obj.transform.position = pos;
	}

}