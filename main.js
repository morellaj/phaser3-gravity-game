var config = {
	type: Phaser.AUTO,
	width: WIDTH,
	height: HEIGHT,
	parent: 'divId',
	debug: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: GRAVITY
			}
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game( config );

function preload() {
	spritesheetLoad( 'chicken', this );
	spritesheetLoad( 'bee', this );
	spritesheetLoad( 'kid', this );
	spritesheetLoad( 'dog', this );
	spritesheetLoad( 'dragon', this );
	spritesheetLoad( 'helicopter', this );
	spritesheetLoad( 'car', this );
	spritesheetLoad( 'arrow', this );
	spritesheetLoad( 'frog', this );
	spriteListLoad( 'crocodile', this );
	spriteListLoad( 'rocket', this );
	this.load.image( 'earth', 'assets/bg.png' );
	this.load.image( 'moon', 'assets/moon.png' );
	this.load.image( 'ground', 'assets/ground.png' );

	/*
		this.load.image( 'crocodileSprites', 'assets/crocodile/frame-1.png' );
		this.load.image( 'crocodileSprites2', 'assets/crocodile/frame-2.png' );
		this.load.image( 'crocodileSprites3', 'assets/crocodile/frame-3.png' );
		this.load.image( 'crocodileSprites4', 'assets/crocodile/frame-4.png' );
		this.load.image( 'crocodileSprites5', 'assets/crocodile/frame-5.png' );
		this.load.image( 'crocodileSprites6', 'assets/crocodile/frame-6.png' );
		this.load.image( 'crocodileSprites7', 'assets/crocodile/frame-7.png' );
		this.load.image( 'crocodileSprites8', 'assets/crocodile/frame-8.png' );
	*/
}

function create() {
	this.input.dragTimeThreshold = DRAGTIMETHRESH;

	gnd = this.physics.add.staticGroup( {
		key: 'ground',
		frameQuantity: 30,
		setXY: {
			x: ( imageList[ 'ground' ].scale * imageList[ 'ground' ].frameWidth ) / 2,
			y: HEIGHT - ( imageList[ 'ground' ].scale * imageList[ 'ground' ].frameHeight ) / 2,
			stepX: imageList[ 'ground' ].scale * imageList[ 'ground' ].frameWidth
		},
		setScale: {
			x: imageList[ 'ground' ].scale,
			y: imageList[ 'ground' ].scale
		},
	} );
	gndHeight = imageList[ 'ground' ].scale * imageList[ 'ground' ].frameHeight;

	/*
		gnd.children.iterate( function( child ) {
			child.refreshBody();
		} );
	  */

	/*
		bg = this.add.image( WIDTH / 2, HEIGHT / 2, 'bg' );
		var scale = WIDTH / bg.width > HEIGHT / bg.height ? WIDTH / bg.width : HEIGHT / bg.height;
		bg.setScale( scale );
	  */

	loadWorld( 'earth', this );

	/*
		var animsCreate = function( sprite ) {
			if ( sprite === 'arrow' ) {}
			scene.anims.create( {
				key: sprite + 'Anim',
				frames: scene.anims.generateFrameNumbers( sprite + 'Sprites' ),
				frameRate: 4,
				repeat: -1
			} )
		};
	  */

	animsCreate( 'chicken', this );
	animsCreate( 'bee', this );
	animsCreate( 'kid', this );
	animsCreate( 'dog', this );
	animsCreate( 'dragon', this );
	animsCreate( 'car', this );
	animsCreate( 'helicopter', this );
	animsCreate( 'arrow', this );
	this.anims.create( {
		key: 'crocodileAnim',
		frames: [ {
				key: 'crocodileSprites'
			},
			{
				key: 'crocodileSprites2'
			},
		],
		frameRate: imageList.crocodile.frameRate,
		repeat: imageList.crocodile.animRepeat
	} );

	this.anims.create( {
		key: 'crocodileAnimJump',
		frames: [ {
			key: 'crocodileSprites7'
		} ],
		frameRate: imageList.crocodile.frameRate,
		repeat: -1
	} );

	this.anims.create( {
		key: 'crocodileAnimFall',
		frames: [ {
			key: 'crocodileSprites8'
		} ],
		frameRate: imageList.crocodile.frameRate,
		repeat: -1
	} );

	this.anims.create( {
		key: 'rocketAnim',
		frames: [ {
			key: 'rocketSprites'
		} ],
		frameRate: imageList.rocket.frameRate,
		repeat: -1
	} )

	this.anims.create( {
		key: 'rocketAnimStop',
		frames: [ {
			key: 'rocketSprites2'
		} ],
		frameRate: imageList.rocket.frameRate,
		repeat: -1
	} )

	this.anims.create( {
		key: 'frogAnim',
		frames: [ {
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 3
			},
			{
				key: 'frogSprites',
				frame: 4
			},
			{
				key: 'frogSprites',
				frame: 5
			},
			{
				key: 'frogSprites',
				frame: 6
			}
		],
		yoyo: true,
		frameRate: imageList.frog.frameRate,
		repeat: imageList.frog.animRepeat
	} );

	this.anims.create( {
		key: 'frogAnimJump',
		frames: this.anims.generateFrameNumbers( 'frogSprites', {
			start: 0,
			end: 0
		} ),
		frameRate: imageList.frog.frameRate,
		repeat: -1
	} );

	this.anims.create( {
		key: 'frogAnimFall',
		frames: this.anims.generateFrameNumbers( 'frogSprites', {
			start: 2,
			end: 2
		} ),
		frameRate: imageList.frog.frameRate,
		repeat: -1
	} );





	var arrowRight = this.physics.add.sprite( 150, sHeight - 40, 'arrowSprites' )
		.setInteractive()
		.setScale( imageList[ 'arrow' ].scale );
	arrowRight.body.allowGravity = false;
	arrowRight.anims.play( 'arrowAnim', true );
	arrowRight.name = 'arrowRight';

	var arrowLeft = this.physics.add.sprite( 50, sHeight - 40, 'arrowSprites' )
		.setInteractive()
		.setFlipX( true )
		.setScale( imageList[ 'arrow' ].scale );
	arrowLeft.body.allowGravity = false;
	arrowLeft.anims.play( 'arrowAnim', true );
	arrowLeft.name = 'arrowLeft';

	charSelect = this.add.image( 100, sHeight - 40, newObject + 'Sprites' )
		.setScale( imageList[ newObject ].scale * .5 );

	this.input.on( 'gameobjectout', function( pointer, gameObject ) {
		mouseOver = false;
	} );

	this.input.on( 'gameobjectover', function( pointer, gameObject ) {
		mouseOver = true;
	} );

	this.input.on( 'pointerdown', function( pointer ) {
		if ( !mouseOver ) {
			addSprite( pointer, newObject, this );
		}
	}, this );

	this.input.on( 'dragstart', function( pointer, obj ) {
		obj.body.moves = false;
		obj.setVelocity( 0, 0 );
		obj.anims.pause();
	} );

	this.input.on( 'drag', function( pointer, gameObject, dragX, dragY ) {
		gameObject.x = dragX;
		gameObject.y = dragY;
	} );

	this.input.on( 'dragend', function( pointer, obj ) {
		obj.body.moves = true;
		obj.anims.pause();
	} );

	this.input.on( 'gameobjectdown', function( pointer, object ) {
		if ( object !== arrowRight && object !== arrowLeft ) {
			object.anims.isPaused ? object.anims.resume() : object.anims.pause();
		}
	} )

	arrowRight.on( 'pointerdown', function( pointer, object ) {
		arrowIncrement( 1, this );
	}, this );

	arrowLeft.on( 'pointerdown', function( pointer, object ) {
		arrowIncrement( -1, this );
	}, this );


}

function update() {
	objects.forEach( function( object ) {
		if ( imageList[ object.name ].type === 'jumping' ) {
			jumpUpdate( object );
		} else if ( imageList[ object.name ].type === "flying" ) {
			flyingUpdate( object );
		} else if ( imageList[ object.name ].type === "walking" ) {
			walkingUpdate( object );
		} else if ( imageList[ object.name ].type === "vertical" ) {
			verticalUpdate( object );
		}
	} );


	limitLength( objects, MAXOBJECTS );

	newEnv = 'earth';

	if ( newEnv !== currentEnv ) {
		loadWorld( newEnv, this );
	}

	getSettings();
	if ( objects[ 0 ] ) {};
}
