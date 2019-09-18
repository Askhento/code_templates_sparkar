
// import Deque

function Deque(a){if(this._capacity=getCapacity(a),this._length=0,this._front=0,isArray(a)){for(var b=a.length,c=0;c<b;++c)this[c]=a[c];this._length=b}}Deque.prototype.toArray=function(){for(var a=this._length,b=Array(a),c=this._front,d=this._capacity,e=0;e<a;++e)b[e]=this[c+e&d-1];return b},Deque.prototype.push=function(a){var b=arguments.length,c=this._length;if(1<b){var d=this._capacity;if(c+b>d){for(var e=0;e<b;++e){this._checkCapacity(c+1);var f=this._front+c&this._capacity-1;this[f]=arguments[e],c++,this._length=c}return c}for(var f=this._front,e=0;e<b;++e)this[f+c&d-1]=arguments[e],f++;return this._length=c+b,c+b}if(0===b)return c;this._checkCapacity(c+1);var e=this._front+c&this._capacity-1;return this[e]=a,this._length=c+1,c+1},Deque.prototype.pop=function(){var a=this._length;if(0!==a){var b=this._front+a-1&this._capacity-1,c=this[b];return this[b]=void 0,this._length=a-1,c}},Deque.prototype.shift=function(){var a=this._length;if(0!==a){var b=this._front,c=this[b];return this[b]=void 0,this._front=b+1&this._capacity-1,this._length=a-1,c}},Deque.prototype.unshift=function(a){var b=this._length,c=arguments.length;if(1<c){var d=this._capacity;if(b+c>d){for(var e=c-1;0<=e;e--){this._checkCapacity(b+1);var d=this._capacity,f=(this._front-1&d-1^d)-d;this[f]=arguments[e],b++,this._length=b,this._front=f}return b}for(var f,g=this._front,e=c-1;0<=e;e--)f=(g-1&d-1^d)-d,this[f]=arguments[e],g=f;return this._front=g,this._length=b+c,b+c}if(0===c)return b;this._checkCapacity(b+1);var d=this._capacity,e=(this._front-1&d-1^d)-d;return this[e]=a,this._length=b+1,this._front=e,b+1},Deque.prototype.peekBack=function(){var a=this._length;if(0!==a){var b=this._front+a-1&this._capacity-1;return this[b]}},Deque.prototype.peekFront=function(){return 0===this._length?void 0:this[this._front]},Deque.prototype.get=function(a){var b=a;if(b===(0|b)){var c=this._length;return 0>b&&(b+=c),0>b||b>=c?void 0:this[this._front+b&this._capacity-1]}},Deque.prototype.isEmpty=function(){return 0===this._length},Deque.prototype.clear=function(){for(var a=this._length,b=this._front,c=this._capacity,d=0;d<a;++d)this[b+d&c-1]=void 0;this._length=0,this._front=0},Deque.prototype.toString=function(){return this.toArray().toString()},Deque.prototype.valueOf=Deque.prototype.toString,Deque.prototype.removeFront=Deque.prototype.shift,Deque.prototype.removeBack=Deque.prototype.pop,Deque.prototype.insertFront=Deque.prototype.unshift,Deque.prototype.insertBack=Deque.prototype.push,Deque.prototype.enqueue=Deque.prototype.push,Deque.prototype.dequeue=Deque.prototype.shift,Deque.prototype.toJSON=Deque.prototype.toArray,Object.defineProperty(Deque.prototype,"length",{get:function(){return this._length},set:function(){throw new RangeError("")}}),Deque.prototype._checkCapacity=function(a){this._capacity<a&&this._resizeTo(getCapacity(1.5*this._capacity+16))},Deque.prototype._resizeTo=function(a){var b=this._capacity;this._capacity=a;var c=this._front,d=this._length;if(c+d>b){arrayMove(this,0,this,b,c+d&b-1)}};var isArray=Array.isArray;function arrayMove(a,b,c,d,e){for(var f=0;f<e;++f)c[f+d]=a[f+b],a[f+b]=void 0}function pow2AtLeast(a){return a>>>=0,--a,a|=a>>1,a|=a>>2,a|=a>>4,a|=a>>8,a|=a>>16,a+1}function getCapacity(a){if("number"!=typeof a)if(isArray(a))a=a.length;else return 16;return pow2AtLeast(Math.min(Math.max(16,a),1073741824))}

const SegmentObject = function(type, ind){

    const obj = segmentsFrame.find(type+ind);
    obj.transform.scaleX = SEGMENT_SCALE;
    obj.transform.scaleY = SEGMENT_SCALE;
    var segmentY;

    switch(type){

    	case "low":
    		segmentY = screenY.div(-2).add(SEGMENT_SCALE.mul(PLANE_SIZE_2D * SEGMENT_SHRINK));
    		break;

       	case "high":
    		segmentY = screenY.div(2).sub(SEGMENT_SCALE.mul(PLANE_SIZE_2D * SEGMENT_SHRINK));
    		break;
    }

    function bindPosition(){
        obj.transform.position = R.point(
        	R.add(gamePosition, SEGMENT_DISTANCE.mul(ind)).mod(SEGMENT_DISTANCE.mul(SEGMENT_COUNT)).neg().add(SEGMENT_OFFSET),
            segmentY,
            0
        );
    }
    this.bindPosition = bindPosition;
} 





const Game = function(){

	const CharObject = function(name){
	    const obj = gameFrame.find(name);
	    this.obj = obj;
	    const initX = screenX.div(-4);

		const dim = R.pack2(obj.transform.scaleX.div(.9), obj.transform.scaleY.div(.9));
		this.dim = dim;
		const pos2d = R.pack2(obj.transform.position.x, obj.transform.position.y);    
		this.pos2d = pos2d;


	    var mouthOnSub;
	    var mouthOffSub;
	    let speedY = 0.5;

	    function init(){
	        obj.transform.position = R.point(
	            initX,
	            0,
	            0
	        );
			obj.transform.rotationZ = 0;

	        // bind();
	    }
	    this.init = init;

	    function bind(){
	    		obj.transform.rotationZ = charAngleSignal;
				if(mouthOnSub != null) {
					mouthOnSub.unsubscribe();
				}
				mouthOnSub = mouthSignal
					.onOn({fireOnInitialValue: true})
					.subscribeWithSnapshot(
						{
							prevGamePos : gamePosition,
							prevCharPos : obj.transform.position.y
						},
						function(val, snap){
							speedY = Math.abs(speedY);
							obj.transform.position = R.point(
								initX,
								gamePosition.sub(snap.prevGamePos).mul(speedY).add(snap.prevCharPos),
								0
							);	

					
						});

				if(mouthOffSub != null) {
					mouthOffSub.unsubscribe();
				}
				mouthOffSub = mouthSignal
					.onOff({fireOnInitialValue: true})
					.subscribeWithSnapshot(
						{
							prevGamePos : gamePosition,
							prevCharPos : obj.transform.position.y
						},
						function(val, snap){
							speedY = -Math.abs(speedY);
							obj.transform.position = R.point(
								initX,
								gamePosition.sub(snap.prevGamePos).mul(speedY).add(snap.prevCharPos),
								0
							);		
	 
				
						});	
	    }
	    this.bind = bind;

		function pause(){
			if(mouthOffSub != null) {
				mouthOffSub.unsubscribe();
			}
			if(mouthOnSub != null) {
				mouthOnSub.unsubscribe();
			}

			R.once().subscribeWithSnapshot(
				{
					prevCharPos : obj.transform.position.y,
					prevCharAngle : obj.transform.rotationZ
				},
				function(val, snap){
					// D.log('stopping char');
					obj.transform.position = R.point(
						initX,
						snap.prevCharPos,
						0
					);
					obj.transform.rotationZ = snap.prevCharAngle;
				})
		}
	    this.pause = pause;
	}

	// CONSTRUCTOR 
	const char = new CharObject('char_null');
	this.char = char;
	char.init();

	let gamePlaying = false;
	
	var insideCollisionSub;
	const insideCollision =  bindCollision1D(R.pack2(char.obj.transform.position.y, char.dim.y), R.pack2(0, R.sub(50, char.dim.y.mul(2)) )).not();

	var destroyCollisionSub;


	function bindDestroyCollision(){
		if(destroyCollisionSub != null) {
			destroyCollisionSub.unsubscribe();
		}


		// const colliders = [];

		// for (let i = 0; i < Math.min(NUM_OF_COLLIDERS, obstaclesCreateQueue.length); i++) {
		// 	colliders.push(bindCollision2D(char, obstaclesCreateQueue.get(i)));
		// }
 		// R.or(insideCollision, R.and(R.orList(colliders), !immortal))

		destroyCollisionSub = insideCollision
			.onOn()
			.subscribeWithSnapshot(
				{
					prevPos: gamePosition,
					prevTime: currentTime,
					speed: currentSpeed
				},
				function(val, snap){
					
					destroyCollisionSub.unsubscribe();
					// D.log('collision');
					gamePlaying = false;
					// charBang.startAnimation(char.pos2d, char.dim.div(2.5));
					pauseGameMovement(snap.prevPos, snap.prevTime, snap.speed, STOP_TIME);						
					
				});	
	}

	function bindAll(prevPos, prevTime){
		D.log('binding all-----------------------------------------------------------------------');

		if(gamePlaying){
			char.bind();
		  	// bindCreateNextObstacle();
		  	// bindObstacleCross();
		  	bindDestroyCollision();	  		
	  	
		}

	}
	this.bindAll = bindAll;

	function start(prevPos, prevTime){
		// D.log('start game');
		speedIndex = 0;
		// currentScore = 0;
		// setScore(currentScore);

		gamePlaying = true;

		// prevObstaclePos = prevPos;
		// nextObstacleDistance = screenX;
		char.init();

		configGamePosition(prevPos, prevTime);
		// char.bind();

		// bindInsideCollision();

	}
	this.start = start;


	function pauseGame(){
		D.log('pausing in game');
		char.pause();
		gamePlaying = false;
		unsubAll();
	}
	this.pauseGame = pauseGame;

	function unsubAll(){

		D.log('unsub all');

		if(destroyCollisionSub != null) {
			destroyCollisionSub.unsubscribe();
		}

		// if(obstacleCrossSub != null) {
		// 	obstacleCrossSub.unsubscribe();
		// }



		// if(obstacleCreateSub != null) {
		// 	obstacleCreateSub.unsubscribe();
		// }
	}
}


// MODULES REFENCE - - MODULES REFENCE - - MODULES REFENCE - - MODULES REFENCE - - MODULES REFENCE - - 
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Materials = require('Materials');
const Textures = require('Textures');
const R = require('Reactive');
const Animation = require('Animation');
const D = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Time = require('Time');
const Instruction = require('Instruction');
const CameraInfo = require('CameraInfo');
// const S = require('Shaders');


// UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - UTILS - - 


function getRand(low, high){
    return Math.random() * (high - low) + low;
}

function getSign(){
    return Math.round(Math.random()) * 2 - 1;
}

function toRad(ang){
    return ang * Math.PI / 180;
}

function bindCollision2D(obj0, obj1){
	const pos0 = obj0.pos2d;
	const dim0 = obj0.dim;

	const pos1 = obj1.pos2d;
	const dim1 = obj1.dim;


	function getBoundingBox(pos, dim){

		const halfDim = dim.div(2);
		const topCorner = pos.add(halfDim);
		const lowCorner = pos.sub(halfDim);

		return [lowCorner, topCorner]		
	}

	const bbx0 = getBoundingBox(pos0, dim0);
	const bbx1 = getBoundingBox(pos1, dim1);

	const xOverlay = R.and(
		bbx0[1].x.ge(bbx1[0].x),
		bbx1[1].x.ge(bbx0[0].x)
	);

	const yOverlay = R.and(
		bbx0[1].y.ge(bbx1[0].y),
		bbx1[1].y.ge(bbx0[0].y)
	);

	return R.and(xOverlay, yOverlay);
}

function bindCollision1D(pack0, pack1){

	function getWindow(pack){

		const halfDim = pack.y.div(2);
		const low = pack.x.sub(halfDim);
		const high = pack.x.add(halfDim);

		return [low, high]		
	}

	const window0 = getWindow(pack0);
	const window1 = getWindow(pack1);

	return R.and(
		window0[1].ge(window1[0]),
		window1[1].ge(window0[0])
	);

}


// SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - SCREEN SIZE - - 

const previewHeight = CameraInfo.previewSize.height;
const previewWidth = CameraInfo.previewSize.width;

const screenY = R.val(50);
const screenX = previewWidth.div(previewHeight).mul(screenY);


// VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - VARS & CONSTS - - 

const SEGMENT_COUNT = 6;
const SEGMENT_SCREEN_COUNT = 3;
const PLANE_SIZE_2D = 5;
const SEGMENT_SCALE = screenX.div(SEGMENT_SCREEN_COUNT).div(PLANE_SIZE_2D);
const SEGMENT_SHRINK = .8;
// const SEGMENT_SCALE_DELTA;
const SEGMENT_DISTANCE = screenX.div(SEGMENT_SCREEN_COUNT).mul(2 * SEGMENT_SHRINK);
const SEGMENT_RESET_DISTANCE = SEGMENT_DISTANCE.mul(SEGMENT_COUNT);
const SEGMENT_OFFSET = SEGMENT_RESET_DISTANCE.sub(SEGMENT_DISTANCE.mul(SEGMENT_SCREEN_COUNT));
const STOP_TIME = .5;
const TIME_DIVIDER = 1000;

var currentTime = Time.ms.div(TIME_DIVIDER);
var localTime = currentTime;
const SPEED_CONFIG = {
    interval: [60],
    speed   : [30, 60]
};

const CHAR_MAX_ANGLE_Z = toRad(45);


// SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - SCENE OBJECTS - - 

const gameFrame = Scene.root.find('GAME_FRAME');
const segmentsFrame = gameFrame.find('SEGMENT_FRAME');
const finalScreen = Scene.root.find('FINAL_SCREEN');
// const scoreFace = Scene.root.find('score_face');



// FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - FACE SIGNALS - - 
const MOUTH_THRESHOLD = .2;
const face = FaceTracking.face(0);

//mouth
const mouthSignal = face.mouth.openness.ge(MOUTH_THRESHOLD);

const charAngleSignal = Animation.animate(
	Animation.valueDriver(face.mouth.openness, 0, MOUTH_THRESHOLD), 
	Animation.samplers.linear(-CHAR_MAX_ANGLE_Z, CHAR_MAX_ANGLE_Z)
).expSmooth(200);


// SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - SETTING GAME SPEED - - 

let speedIndex = 0;

var timeSub;
var tapSub;
var gamePosition;
var currentSpeed;



function configGamePosition(prevPos, prevTime, last){
    // D.log('configuring game');
    const interval = SPEED_CONFIG.interval[speedIndex];
    const startSpeed = SPEED_CONFIG.speed[speedIndex];
    const endSpeed = SPEED_CONFIG.speed[speedIndex + 1];
    const accel = (endSpeed - startSpeed) / interval; 
    localTime = Time.ms.div(TIME_DIVIDER).sub(prevTime);

    if(!last){
        currentSpeed =  R.add(
                                startSpeed, 
                                R.mul(accel, localTime)
                            );
        gamePosition = R.mul(
                            localTime,
                            R.add(
                                startSpeed, 
                                R.mul(accel / 2, localTime)
                            )
                        ).add(prevPos);
        bindPositions(prevPos, prevTime);

        if(timeSub != null) {
            Time.clearTimeout(timeSub);
        }

        timeSub = Time.setTimeoutWithSnapshot({
                prevPos: gamePosition,
                prevTime: currentTime
            },
            function(val, snap){
                Time.clearTimeout(timeSub);
                speedIndex++;
                if(speedIndex < SPEED_CONFIG.interval.length){
                    configGamePosition(snap.prevPos, snap.prevTime);
                } else {
                    speedIndex--;
                    configGamePosition(snap.prevPos, snap.prevTime, true);
                }
            }, interval * TIME_DIVIDER);            
    } else {
        currentSpeed = R.val(endSpeed);
        gamePosition = R.mul(
                            localTime,
                            endSpeed
                        ).add(prevPos);

        bindPositions(prevPos, prevTime);
    }
}

function pauseGameMovement(prevPos, prevTime, speed, interval){
        if(timeSub != null) {
            Time.clearTimeout(timeSub);
        }

        const accel = -speed / interval; 
        localTime = Time.ms.div(TIME_DIVIDER).sub(prevTime);

        gamePosition = R.mul(
                            localTime,
                            R.add(
                                speed, 
                                R.mul(accel / 2, localTime)
                            )
                        ).add(prevPos);

        bindPositions(prevPos, prevTime);
        game.pauseGame();

        timeSub = Time.setTimeoutWithSnapshot({
                prevPos: gamePosition,
                prevTime : currentTime
            },
            function(val, snap){
                timeSub.unsubscribe();
                gamePosition = R.val(snap.prevPos);
                bindPositions(snap.prevPos, snap.prevTime);
                showFinalScreen();
            }, interval * TIME_DIVIDER);        

}


function bindPositions(prevPos, prevTime){
    bindSegments();
    game.bindAll();
}

function bindSegments(){
    for (let i = 0; i < segments.length; i++) {
        segments[i].bindPosition();
    }   
}


// containers for scene objects

const segments = [];
const game = new Game();

// initial segmentevent to get snapshot, start choice menu  run only once
function init(){
    Time.setTimeoutWithSnapshot(
            {
                prevTime: currentTime
            },
            function(val, snap){

                for (let i = 0; i < SEGMENT_COUNT; i++) {
                    segments.push(new SegmentObject("low",i)); 
                    segments.push(new SegmentObject("high",i)); 

                }
                gamePosition = R.val(0);
                subToStart();
                bindSegments();

            }   
        ,10);
}
init();

// start choice vars and scene objects 
// const startHint = Scene.root.find('start_hint');

function subToStart(){
    // startHint.hidden = false;
    // setScore(0);
    game.char.init();

	if(tapSub != null) {
		tapSub.unsubscribe();
	}	

    tapSub = TouchGestures
    	.onTap()
        .subscribeWithSnapshot(
                {
                    prevTime: currentTime,
                    prevPos: gamePosition
                },
                function(val, snap){
                	tapSub.unsubscribe();
                	game.start(snap.prevPos, snap.prevTime);
                }
            );
}


function showFinalScreen(){
	if(tapSub != null) {
		tapSub.unsubscribe();
	}	
	finalScreen.hidden = false;

	tapSub = TouchGestures
		.onTap()
		.subscribe(
			function(gest){
				tapSub.unsubscribe();
   				finalScreen.hidden = true;
				subToStart();
			});
}




