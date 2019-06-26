function addPoints(p1, p2, scale){
	if(scale == null) {
		scale = 1;
	}
	const x = p1.x.add(p2.x);
	const y = p1.y.add(p2.y);
	const z = p1.z.add(p2.z);
	return Reactive.point(x.mul(scale), y.mul(scale), z.mul(scale));
}
