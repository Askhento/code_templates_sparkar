const texts = [];
for (let i = 0; i < 6; i++) {
	texts.push(Scene.root.find('text'+i));
	texts[i].transform.position = R.point(0,250 - i*50,0);
}

texts[0].text = R.concat('ptX = ' , DeviceMotion.worldTransform.position.x.round().toString());
texts[1].text = R.concat('ptY = ' , DeviceMotion.worldTransform.position.y.round().toString());
texts[2].text = R.concat('ptZ = ' , DeviceMotion.worldTransform.position.z.round().toString());

texts[3].text = R.concat('ptRotX = ' , DeviceMotion.worldTransform.rotationX.round().toString());
texts[4].text = R.concat('ptRotY = ' , DeviceMotion.worldTransform.rotationY.round().toString());
texts[5].text = R.concat('ptRotZ = ' , DeviceMotion.worldTransform.rotationZ.round().toString());