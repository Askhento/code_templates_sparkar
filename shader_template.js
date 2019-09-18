// Creating Water like shader

const D = require('Diagnostics');
const R = require('Reactive');
const S = require('Shaders');
const T = require('Time');
const Scene = require('Scene');
const Materials = require('Materials');
const Textures = require('Textures');

const screenPixelXY = CameraInfo.previewSize;
const screenProportion = R.div(screenPixelXY.width, screenPixelXY.height);
const screenSize = R.pack2(screenProportion, 1).mul(25);
let screenX;
let screenY;
const focalDistance = -Scene.root.find('Focal Distance').transform.z.pinLastValue();



const TIME_MUL = .0001;
const TEX_COORDS = S.vertexAttribute({'variableName': S.VertexAttribute.TEX_COORDS});
const LOCAL_POSITION = S.vertexAttribute({'variableName': S.VertexAttribute.POSITION});
const BASE_POSITION = S.vertexAttribute({'variableName': S.VertexAttribute.BASE_POSITION});
const MVP_MATRIX = S.vertexTransform({'variableName': S.BuiltinUniform.MVP_MATRIX});
const VP_MATRIX = S.vertexTransform({'variableName': S.BuiltinUniform.VP_MATRIX});
const MV_MATRIX = S.vertexTransform({'variableName': S.BuiltinUniform.MV_MATRIX});
const P_MATRIX = S.vertexTransform({'variableName': S.BuiltinUniform.P_MATRIX});
const time = T.ms.mul(TIME_MUL);

const material = Materials.get('someMat');

material.setTexture(sampled_A, {textureSlotName: S.DefaultMaterialTextures.DIFFUSE});	
