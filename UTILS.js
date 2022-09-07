const R = require('Reactive');
const D = require('Diagnostics');


/**
 * 
 * @param {Reactive type of vector signal like : pack[1,2,3,4], vector, point etc} vector
 * @param {Array with string keys for object fields} fields 
 * @param {Num digits after ""."" } numDecimals 
 * @returns String 
 */
export function vecToString(vector, fields, numDecimals = 4) {
    let res = R.val("");
    fields.forEach(field => {
        res = R.concat(res, R.concat(" " + field, vector[field].format(" : {:." + (numDecimals).toString() + "f}")));
    });
    return res;
}


export function getRand(low, high) {
    return Math.random() * (high - low) + low;
}
export function getRandInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

export function getRandBool() {
    return Math.random() >= 0.5;
}

export function getRandSign() {
    return Math.round(Math.random()) * 2 - 1;
}

export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
};



export function sawToooth(progress) {
    return R.sub(1, R.sub(1, R.mul(2, progress)).abs());
}


export function fractMod(val, mod = 1) {
    return val.sub(val.div(mod).floor().mul(mod));
}

export function deStep(signal, edge0, edge1) {
    return R.add(
        R.step(signal, edge0),
        R.step(edge1, signal)
    ).sub(R.step(edge1, edge0))
}

export function deSmoothStep(signal, edge0, edge1, delta, mode = "mid") {
    // todo : fix in/out edge case when edges are fliped
    edge0 = R.val(edge0);
    edge1 = R.val(edge1);
    let e0_low, e0_high, e1_low, e1_high, w = delta;
    switch (mode) {
        case "mid":
            w = R.mul(delta, .5);
            e0_low = edge0.sub(w);
            e0_high = edge0.add(w);
            e1_low = edge1.add(w);
            e1_high = edge1.sub(w);
            break;
        case "out":
            e0_low = edge0.sub(w);
            e0_high = edge0;
            e1_low = edge1.add(w);
            e1_high = edge1;
            break;
        case "in":
            e0_low = edge0;
            e0_high = edge0.add(w);
            e1_low = edge1;
            e1_high = edge1.sub(w);
            break;
        default:
            throw 'Wrong mode for deSmoothStep. Options are : mid, out, in'
    }

    return R.add(
        R.smoothStep(signal, e0_low, e0_high),
        R.smoothStep(signal, e1_low, e1_high)
    ).sub(R.step(edge1, edge0));
}


// get min/max signal from list of signals 

export function minList(list) {
    var oldElem = 0;
    for (let i = list.length - 1; i >= 0; i--) {
        const newElem = R.min(list[i], oldElem);
        oldElem = newElem;
    }
    return oldElem;
}

export function maxList(list) {
    var oldElem = 0;
    for (let i = list.length - 1; i >= 0; i--) {
        const newElem = R.max(list[i], oldElem);
        oldElem = newElem;
    }
    return oldElem;
}


export function getVertex2MVP2d() {
    const vertex2MVP = MVP_MATRIX.mul(S.fragmentStage(LOCAL_POSITION));
    const vertex2MVP2d = R.pack2(vertex2MVP.x, vertex2MVP.y).div(vertex2MVP.w);
    return vertex2MVP2d;
}



export function rayCastPlane(ray, plane) {
    const dotP = R.dot(plane.normal, ray.direction);
    const distToHit = R.dot(R.sub(plane.point, ray.origin), plane.normal).div(dotP);
    const hitPoint = R.add(ray.origin, R.mul(distToHit, ray.direction));

    return hitPoint;
}


export function smallFaceTransform(face, obj, distanceFromCamera) {
    const objVectorNorm = R.vector(
        face.cameraTransform.position.x,
        face.cameraTransform.position.y,
        face.cameraTransform.position.z
    ).normalize().mul(distanceFromCamera);

    // vector for locating obj
    const objPointNorm = objVectorNorm.add(R.point(0, 0, focalDistance));


    obj.transform.position = objPointNorm;

    obj.transform.rotationX = face.cameraTransform.rotationX;
    obj.transform.rotationY = face.cameraTransform.rotationY;
    obj.transform.rotationZ = face.cameraTransform.rotationZ;


    // calculating scale of obj
    const objScale = R.div(distanceFromCamera, face.cameraTransform.position.magnitude());

    obj.transform.scaleX = objScale;
    obj.transform.scaleY = objScale;
    obj.transform.scaleZ = objScale;
}



export function getPersonEllipseMask(ind) {

    const face = FaceTracking.face(ind);
    // const faceTracker = Scene.root.find('faceTracker' + ind);


    const faceCenterLocal = R.point(0, .01, -.05);
    const rightCheekBone = faceCenterLocal.add(R.vector(face.rightCheek.cheekbone.x, 0, 0));
    const foreheadTop = faceCenterLocal.add(R.vector(0, face.forehead.top.y, 0));

    //!test planes
    // const centerPlane = faceTracker.child('centerPlane');
    // const xPlane = faceTracker.child('xPlane');
    // const yPlane = faceTracker.child('yPlane');

    // centerPlane.transform.position = faceCenterLocal;
    // xPlane.transform.position = rightCheekBone;
    // yPlane.transform.position = foreheadTop;


    // get face anchor points
    const faceCenter2Camera = face.cameraTransform.applyTo(faceCenterLocal);
    const faceRight2Camera = face.cameraTransform.applyTo(rightCheekBone);
    const faceUp2Camera = face.cameraTransform.applyTo(foreheadTop);


    // normalize face anchor points to screen space (-0.5 to 0.5) 
    const faceCenter2d = R.pack2(faceCenter2Camera.x, faceCenter2Camera.y).div(faceCenter2Camera.z).neg();
    const faceRight2d = R.pack2(faceRight2Camera.x, faceRight2Camera.y).div(faceRight2Camera.z).neg();
    const faceUp2d = R.pack2(faceUp2Camera.x, faceUp2Camera.y).div(faceUp2Camera.z).neg();


    // get the verttex normalized to screen space (-0.5 to 0.5)
    const MV_MATRIX = S.vertexTransform({ 'variableName': S.BuiltinUniform.MV_MATRIX });
    const LOCAL_POSITION = S.vertexAttribute({ 'variableName': S.VertexAttribute.POSITION });
    const vertex2MV = MV_MATRIX.mul(S.fragmentStage(LOCAL_POSITION));
    const vertex2MV2d = R.pack2(vertex2MV.x, vertex2MV.y).div(vertex2MV.z.neg());



    //! anchor points testing alpha 
    // const vertex2faceCenterVector = R.sub(faceCenter2d, vertex2MV2d);
    // const vertex2faceRightVector = R.sub(faceRight2d, vertex2MV2d);   
    // const vertex2faceUpVector = R.sub(faceUp2d, vertex2MV2d);
    // const personAlpha0 = R.smoothStep(vertex2faceCenterVector.magnitude(), FACE_ALPHA_RADIUS_0, FACE_ALPHA_RADIUS_1);
    // const personAlpha1 = R.smoothStep(vertex2faceRightVector.magnitude(), FACE_ALPHA_RADIUS_0, FACE_ALPHA_RADIUS_1);
    // const personAlpha2 = R.smoothStep(vertex2faceUpVector.magnitude(), FACE_ALPHA_RADIUS_0, FACE_ALPHA_RADIUS_1);


    // getting face ellipse axis vectors
    const upVector = faceUp2d.sub(faceCenter2d);
    const rightVector = faceRight2d.sub(faceCenter2d);
    const rightVectorNorm = rightVector.normalize();

    // angle of right vecotr to X axis
    const rotationZ = R.atan2(rightVectorNorm.y, rightVectorNorm.x);

    //* here is a formula for an ellipse found here : https://math.stackexchange.com/questions/426150/what-is-the-general-equation-of-the-ellipse-that-is-not-in-the-origin-and-rotate
    const vertexOffset = vertex2MV2d.sub(faceCenter2d);
    const upSemiAxisSq = R.add(upVector.x.pow(2), upVector.y.pow(2));
    const rightSemiAxisSq = R.add(rightVector.x.pow(2), rightVector.y.pow(2));

    const faceEllipse0 = R.add(
        vertexOffset.x
            .mul(R.cos(rotationZ)),
        vertexOffset.y
            .mul(R.sin(rotationZ))
    ).pow(2).div(rightSemiAxisSq);

    const faceEllipse1 = R.sub(
        vertexOffset.x
            .mul(R.sin(rotationZ)),
        vertexOffset.y
            .mul(R.cos(rotationZ))
    ).pow(2).div(upSemiAxisSq);

    // const faceEllipse = R.smoothStep(R.add(faceEllipse0, faceEllipse1).sqrt(), edges[0], edges[1]);
    const faceEllipse = R.add(faceEllipse0, faceEllipse1).sqrt();
    return faceEllipse;
}

export function getNormal(object) {
    var Pitch = object.transform.rotationX;
    var Yaw = object.transform.rotationY;
    var Roll = object.transform.rotationZ;

    var hv_x = R.cos(Pitch).mul(R.cos(Roll)).mul(R.sin(Yaw)).add(R.sin(Pitch).mul(R.sin(Roll)));
    var hv_y = R.cos(Roll).neg().mul(R.sin(Pitch)).add(R.cos(Pitch).mul(R.sin(Yaw)).mul(R.sin(Roll)));
    var hv_z = R.cos(Pitch).mul(R.cos(Yaw));

    return R.vector(hv_x, hv_y, hv_z);
}

export function rotateUV(p, ang) {
    const c = R.cos(ang);
    const s = R.sin(ang);

    return R.pack2(
        R.sub(p.x.mul(c), p.y.mul(s)),
        R.add(p.x.mul(s), p.y.mul(c))
    );
}