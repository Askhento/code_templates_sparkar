function bindCollision2D(obj0, obj1) {
	const pos0 = obj0.pos2d;
	const dim0 = obj0.dim;

	const pos1 = obj1.pos2d;
	const dim1 = obj1.dim;

	function getBoundingBox(pos, dim) {
		const halfDim = dim.div(2);
		const topCorner = pos.add(halfDim);
		const lowCorner = pos.sub(halfDim);

		return [lowCorner, topCorner];
	}

	const bbx0 = getBoundingBox(pos0, dim0);
	const bbx1 = getBoundingBox(pos1, dim1);

	const xOverlay = R.and(bbx0[1].x.ge(bbx1[0].x), bbx1[1].x.ge(bbx0[0].x));

	const yOverlay = R.and(bbx0[1].y.ge(bbx1[0].y), bbx1[1].y.ge(bbx0[0].y));

	return R.and(xOverlay, yOverlay);
}

function bindCollision1D(c0, s0, c1, s1) {
	const hd0 = R.div(s0, 2);
	const window0 = [R.sub(c0, hd0), R.add(c0, hd0)];

	const hd1 = R.div(s1, 2);
	const window1 = [R.sub(c1, hd1), R.add(c1, hd1)];

	return R.and(window0[1].ge(window1[0]), window1[1].ge(window0[0]));
}

function bindCollision1D(pack0, pack1) {
	function getWindow(pack) {
		const halfDim = pack.y.div(2);
		const low = pack.x.sub(halfDim);
		const high = pack.x.add(halfDim);

		return [low, high];
	}

	const window0 = getWindow(pack0);
	const window1 = getWindow(pack1);

	return R.and(window0[1].ge(window1[0]), window1[1].ge(window0[0]));
}
