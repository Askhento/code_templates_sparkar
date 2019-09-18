
const pointToLineDist = function(L0, L1, P0) { // input point signals
	const vBase = L1.sub(L0).normalize();
	// return P0.distance(L0.add(v.mul(P0.sub(L0).dot(v).div(v.dot(v))))); // returns scalar signal
	const vPoint = P0.sub(L0);
	const projection = vBase.dot(vPoint);
	const vProjection = vBase.mul(projection);
	const vNormal = P0.sub(vProjection);
	const cross = R.pack2(vPoint, 0).cross(R.pack2(vProjection, 0));
	return vNormal.magnitude().mul(cross.z.sign());
};