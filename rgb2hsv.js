/**
* Convert RGB color value to HSV. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSV_color_space
* and https://gist.github.com/mjackson
* Assumes r, g, and b are contained in the set [0, 1] and
* returns h, s, and v in the set [0, 1] as separate functions.
*/
const Reactive = require('Reactive');
function rgbToHue(r, g, b) {
var maxRGB = Reactive.max(Reactive.max(r,g),b);
var minRGB = Reactive.min(Reactive.min(r,g),b);
var d = maxRGB.sub(minRGB);
// The below code block is a Reactive refactoring of the following conditional test
/*
  if (maxRGB == minRGB) {
    h = 0; // achromatic
  } else {
    switch (maxRGB) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  */
var BMaxEqualityTest = maxRGB.eq(b).ifThenElse(((r.sub(g)).div(d)).add(4), 0);
var GMaxEqualityTest = maxRGB.eq(g).ifThenElse(((b.sub(r)).div(d)).add(2), BMaxEqualityTest);
var gComparison = g.lt(b).ifThenElse(6,0);
var RMaxEqualityTest = maxRGB.eq(r).ifThenElse(((g.sub(b)).div(d)).add(gComparison), GMaxEqualityTest);
var h = maxRGB.eq(minRGB).ifThenElse(0, RMaxEqualityTest);
  h = h.div(6);
return h;
}
function rgbToSaturation(r, g, b) {
var maxRGB = Reactive.max(Reactive.max(r,g),b);
var minRGB = Reactive.min(Reactive.min(r,g),b);
var d = maxRGB.sub(minRGB);
var s = maxRGB.eq(0).ifThenElse(0, d.div(maxRGB));
return s;
}
function rgbToLightness(r, g, b) {
var v = Reactive.max(Reactive.max(r,g),b);
return v;
}