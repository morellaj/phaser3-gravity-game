// Define constants used
const WIDTH = 1000;
const HEIGHT = 600;
const MAXOBJECTS = 5;
const HITBOXSCALE = 1.5;
const GRAVITY = 200;
const DRAGTIMETHRESH = 100;
const GNDSCALE = .8;

//Define variables used
var bg;
var env;
var eraseObjects;
var envGravity;
var envDrag;
var chicken;
var bee;
var kid;
var car;
var crocodile;
var dog;
var dragon;
var helicopter;
var gnd;
var arrow;
var charSelect;
var itemList;
var itemNumber;
var scene;
var gnd;
var gndheight;
var newEnv;
var currentEnv;
// Item definitions

var envChange = false;
var objects = [];
var envDrag = 50;
var mouseOver = false;
var itemList = [ 'chicken', 'bee', 'kid', 'car', 'crocodile', 'frog', 'rocket', 'hot', 'dog', 'helicopter', 'dragon' ];
var itemNumber = 0;
var newObject = itemList[ itemNumber ];
var sWidth = WIDTH;
var sHeight = HEIGHT;

var panels = document.getElementById( 'panels' );
var resetObjects = document.getElementById( 'reset-objects' );
var resetGame = document.getElementById( 'reset-game' );

// Object for the pre-configured settings
var environmentList = {
	moon: {
		drag: 0,
		gravity: 30,
	},
	earth: {
		drag: 50,
		gravity: 200,
	},
	jupiter: {
		drag: 0.03,
		gravity: 2.4,
	},
	ocean: {
		drag: .1,
		gravity: 1,
	},
	space: {
		drag: 0,
		gravity: 0,
	}
}

var imageList = {
	chicken: {
		frameRate: 5,
		scale: .1,
		elasticityX: .1,
		elasticityY: .1,
		velocityY: 15,
		velocityX: 10,
		velocityXMax: 100,
		velocityYMax: 1000,
		frameWidth: 1100,
		frameHeight: 868,
		mass: 10,
		type: 'flying',
		moveFrame: [ 2 ],
		friction: .9
	},
	bee: {
		frameRate: 5,
		scale: .16,
		elasticityX: 1,
		elasticityY: .1,
		velocityY: 8,
		velocityX: 30,
		velocityXMax: 300,
		velocityYMax: 2000,
		frameWidth: 496,
		frameHeight: 320,
		mass: 1,
		type: 'flying',
		moveFrame: [ 0 ],
		friction: .9
	},
	kid: {
		frameRate: 5,
		scale: .25,
		elasticityX: .1,
		elasticityY: .1,
		velocityY: 0,
		velocityX: 9,
		velocityXMax: 500,
		velocityYMax: 10000,
		frameWidth: 307,
		frameHeight: 445,
		mass: 50,
		type: 'walking',
		moveFrame: [ 1, 2, 3, 4, 5 ],
		friction: .9
	},
	car: {
		frameRate: 5,
		scale: .2,
		elasticityX: 1,
		elasticityY: .1,
		velocityY: 0,
		velocityX: 10,
		velocityXMax: 300,
		velocityYMax: 1000,
		frameWidth: 684,
		frameHeight: 321,
		mass: 200,
		type: 'walking',
		moveFrame: [ 1, 2, 3, 4 ],
		friction: .9
	},
	crocodile: {
		frameRate: 5,
		count: 8,
		scale: .25,
		elasticityX: 1,
		elasticityY: 0,
		velocityY: 200,
		velocityX: 200,
		velocityXMax: 1000,
		velocityYMax: 1000,
		frameWidth: 311,
		frameHeight: 461,
		mass: 50,
		type: 'jumping',
		moveFrame: [ 'croc7' ],
		downFrame: [ 'croc8' ],
		friction: .9
	},
	crocodile: {
		frameRate: 5,
		count: 8,
		scale: .25,
		elasticityX: 1,
		elasticityY: 0,
		velocityY: 200,
		velocityX: 200,
		velocityXMax: 1000,
		velocityYMax: 1000,
		frameWidth: 311,
		frameHeight: 461,
		mass: 50,
		type: 'jumping',
		moveFrame: [ 'croc7' ],
		downFrame: [ 'croc8' ],
		friction: .9,
		animRepeat: 4
	},
	frog: {
		frameRate: 20,
		scale: .8,
		elasticityX: 1,
		elasticityY: 0,
		velocityY: 400,
		velocityX: 200,
		velocityXMax: 1000,
		velocityYMax: 1000,
		frameWidth: 64,
		frameHeight: 64,
		mass: 50,
		type: 'jumping',
		moveFrame: [ 'croc7' ],
		downFrame: [ 'croc8' ],
		friction: .9,
		animRepeat: 2
	},
	rocket: {
		scale: .5,
		count: 2,
		elasticityX: 0,
		elasticityY: 0,
		velocityY: 10,
		velocityX: 0,
		velocityXMax: 1000,
		velocityYMax: 3000,
		frameWidth: 110,
		frameHeight: 177,
		mass: 50,
		type: 'vertical',
		friction: .9
	},
	hot: {
		scale: .5,
		count: 2,
		elasticityX: 0,
		elasticityY: 0,
		velocityY: 10,
		velocityX: 0,
		velocityXMax: 1000,
		velocityYMax: 3000,
		frameWidth: 110,
		frameHeight: 177,
		mass: 50,
		type: 'vertical',
		friction: .9
	},
	dog: {
		frameRate: 20,
		scale: .5,
		elasticityX: .1,
		elasticityY: .1,
		velocityY: 0,
		velocityX: 90,
		velocityXMax: 300,
		velocityYMax: 100,
		frameWidth: 300,
		frameHeight: 203,
		mass: 50,
		type: 'walking',
		moveFrame: [ 2 ],
		friction: .9
	},
	helicopter: {
		frameRate: 5,
		scale: .17,
		elasticityX: .1,
		elasticityY: .1,
		velocityY: 20,
		velocityX: 10,
		velocityXMax: 100,
		velocityYMax: 100,
		frameWidth: 512,
		frameHeight: 450,
		mass: 50,
		type: 'flying',
		moveFrame: [ 1, 2 ],
		friction: .9
	},
	dragon: {
		frameRate: 5,
		scale: .1,
		elasticityX: .1,
		elasticityY: .1,
		velocityY: 20,
		velocityX: 10,
		velocityXMax: 100,
		velocityYMax: 100,
		frameWidth: 817,
		frameHeight: 579,
		mass: 50,
		type: 'flying',
		moveFrame: [ 2 ],
		friction: .9
	},
	ground: {
		scale: .38,
		frameWidth: 205,
		frameHeight: 208,
	},
	arrow: {
		scale: 1,
		frameWidth: 28,
		frameHeight: 21,
		frameRate: 30
	}
}

resetObjects.addEventListener( 'click', resetObjectsClickHandler );
resetGame.addEventListener( 'click', resetGameClickHandler );
