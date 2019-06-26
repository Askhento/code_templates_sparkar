// Created by @kunofellasleep on 2019/05/20.

//Modules
const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
const Textures = require('Textures');
const CameraInfo = require('CameraInfo');
const Shaders = require('Shaders');
const R = require('Reactive');

//Assets
const blurMat = Materials.get('blurMat');
const cameraTex = Textures.get('cameraTex');

const cameraColor = cameraTex.signal;
const texcoords = Shaders.vertexAttribute({'variableName': Shaders.VertexAttribute.TEX_COORDS});

//Can't create 5x5 due to Spark AR API limitations
const kernel = [
  [1, 2, 1], 
  [2, 4, 2],
  [1, 2, 1]
];

var blurColor = R.pack4(0,0,0,1);
var step = 6;
for (var x = 0; x < 3; x++) {
	for (var y = 0; y < 3; y++) {
    	const offsetX = R.div((-1 + x * 1) * step, CameraInfo.previewSize.width);
    	const offsetY = R.div((-1 + y * 1) * step, CameraInfo.previewSize.height);
    	const movecoords = R.add(texcoords, R.pack2(offsetX,offsetY));
    	var sampled = Shaders.textureSampler(cameraColor, movecoords);
        sampled = R.mul(R.div(sampled, 16), kernel[x][y]);
    	blurColor = R.add(blurColor, sampled);
    }
}

blurMat.setTexture(blurColor, {textureSlotName: "diffuseTexture"});