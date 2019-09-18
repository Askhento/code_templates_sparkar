const S = require('Shaders');

// scree size 

const screenPixelXY = CameraInfo.previewSize;
const screenProportion = R.div(screenPixelXY.width, screenPixelXY.height);
const screenSize = R.pack2(screenProportion, 1).mul(50);

function newCircle(pos, size){
	const baseCircle = S.sdfCircle(R.pack2(.5, .5), size);
	const sdfScale = S.sdfScale(baseCircle, R.pack2(.5, .5), R.pack2(R.div(1, screenProportion), 1).div(faceDistanceProportion));
	return S.sdfTranslation(sdfScale, pos);
}

const circles = [];
const NUM_OF_CIRCLES = 2;

for (let i = 0; i < NUM_OF_CIRCLES; i++) {
	circles.push(newCircle(faceCenter2d, .15));
}
