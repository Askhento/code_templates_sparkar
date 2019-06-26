const Scene = require('Scene');
const Animation = require('Animation');
const Materials = require('Materials');

const pizzaRoot = Scene.root.find('pizzaRoot');
const planeTracker = Scene.root.find('planeTracker');
const targetMat = Materials.get('targetMat');

planeTracker.confidence.eq('HIGH').onOn({fireOnInitialValue: true}).subscribe(function(e) {
  // this fires when we succesfully start tracking - show the pizza and hide the CTA
  const driver = Animation.timeDriver({durationMilliseconds: 1000});
  const animatedScale = Animation.animate(driver, Animation.samplers.linear(0, 0.25));
  pizzaRoot.transform.scaleX = animatedScale;
  pizzaRoot.transform.scaleY = animatedScale;
  pizzaRoot.transform.scaleZ = animatedScale;
  targetMat.opacity = Animation.animate(driver, Animation.samplers.easeInOutQuart(1, 0));
  driver.start();
});

planeTracker.confidence.eq('HIGH').onOff({fireOnInitialValue: true}).subscribe(function(e) {
  // tracking lost - reset the pizza and CTA state
  pizzaRoot.transform.scaleX = 0;
  pizzaRoot.transform.scaleY = 0;
  pizzaRoot.transform.scaleZ = 0;
  targetMat.opacity = 1;
});
