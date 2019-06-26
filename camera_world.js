const Scene = require('Scene');
const Reactive = require('Reactive');

var pixelPoint = Reactive.point2d(Reactive.val(375), Reactive.val(667));
var camPosition = Scene.unprojectWithDepth(pixelPoint, 0.01);
var camPositionFar = Scene.unprojectWithDepth(pixelPoint, 1.01);
var camNormalVector = camPositionFar.sub(camPosition);