function getSettings() {
	env = $( "#sel1" ).val();
};

function resetObjectsClickHandler( event ) {
	if ( playing === true ) {
		eraseObjects();
	}
};

function spritesheetLoad( image, scene ) {
	scene.load.spritesheet( image + 'Sprites', 'assets/' + image + '.png', {
		frameWidth: imageList[ image ].frameWidth,
		frameHeight: imageList[ image ].frameHeight
	} )
};

function spriteListLoad( folder, scene ) {
	scene.load.image( folder + 'Sprites', 'assets/' + folder + '/frame-1.png' );
	for ( var i = 2, n = imageList[ folder ].count; i <= n; i++ ) {
		scene.load.image( folder + 'Sprites' + i, 'assets/' + folder + '/frame-' + i + '.png' );
	}
};

function loadWorld( env, scene ) {
	if ( bg ) {
		bg.destroy();
	}
	eraseObjects();
	bg = scene.add.image( sWidth / 2, sHeight / 2, env );
	var scale = sWidth / bg.width > sHeight / bg.height ? sWidth / bg.width : sHeight / bg.height;
	bg.setScale( scale );
	scene.physics.world.gravity.y = environmentList[ env ].gravity;
	envDrag = environmentList[ env ].drag;
	currentEnv = env;
}

// Function to reset the game
function resetGameClickHandler( event ) {
	// If the game is being played, stop the game and display the intro screen
	/*
	        if (playing === true) {
	          playing = false;
	          panels.style.display = 'inline-block';
	        }
	        */
}

function animsCreate( sprite, scene ) {
	if ( sprite === 'arrow' ) {}
	scene.anims.create( {
		key: sprite + 'Anim',
		frames: scene.anims.generateFrameNumbers( sprite + 'Sprites' ),
		frameRate: imageList[ sprite ].frameRate,
		repeat: -1
	} )
};

/*
function animsCreateList( sprite, start, stop, name, scene ) {
	var animFrames = [];

}
*/

function addSprite( pointer, newObject, scene ) {
	var shape = new Phaser.Geom.Circle( imageList[ newObject ].frameWidth / 2, imageList[ newObject ].frameHeight / 2, imageList[ newObject ].frameWidth * HITBOXSCALE );
	var object = scene.physics.add.sprite( pointer.x, HEIGHT - gndHeight - imageList[ newObject ].frameHeight * imageList[ newObject ].scale / 2, newObject + 'Sprites' )
		.setInteractive( shape, Phaser.Geom.Circle.Contains )
		.setScale( imageList[ newObject ].scale )
		.setBounceX( imageList[ newObject ].elasticityX )
		.setBounceY( imageList[ newObject ].elasticityY )
		.setMass( imageList[ newObject ].mass )
		.setCollideWorldBounds( true )
		.setMaxVelocity( imageList[ newObject ].velocityXMax, imageList[ newObject ].velocityYMax )
		.setDrag( envDrag );
	object.name = newObject;
	object.dirRight = true;
	object.status = 'normal';
	scene.input.setDraggable( object );
	object.anims.play( newObject + 'Anim', true );
	scene.physics.add.collider( object, gnd );
	objects.push( object );
}

function jumpUpdate( object ) {
	if ( object.body.blocked.right ) {
		object.setFlipX( true );
		object.dirRight = false;
	} else if ( object.body.blocked.left ) {
		object.dirRight = true;
		object.setFlipX( false );
	}
	if ( !object.body.blocked.down ) {
		object.anims.play( ( object.body.velocity.y <= 0 ? object.name + 'AnimJump' : object.name + 'AnimFall' ), true );
	} else if ( object.anims._repeat === -1 ) {
		object.anims.play( object.name + 'Anim', true );
	} else if ( object.anims.repeatCounter === 0 && object.body.blocked.down ) {
		object.body.velocity.y = -imageList[ object.name ].velocityY;
		object.body.velocity.x = object.dirRight ? imageList[ object.name ].velocityX : -imageList[ object.name ].velocityX;
		object.anims.play( object.name + 'AnimJump' );
	} else if ( object.body.blocked.down ) {
		object.body.velocity.x *= imageList[ object.name ].friction;
	}
};

function flyingUpdate( object ) {
	if ( !object.anims.isPaused ) {
		if ( imageList[ object.name ].moveFrame.includes( object.frame.name ) ) {
			object.body.velocity.y -= imageList[ object.name ].velocityY;
			object.body.velocity.x += object.dirRight ? imageList[ object.name ].velocityX : -imageList[ object.name ].velocityX;
		}
		if ( object.body.blocked.right ) {
			object.setFlipX( true );
			object.dirRight = false;
		} else if ( object.body.blocked.left ) {
			object.dirRight = true;
			object.setFlipX( false );
		}
	} else if ( object.body.blocked.down ) {
		object.body.velocity.x *= imageList[ object.name ].friction;
	}
}

function walkingUpdate( object ) {
	if ( !object.anims.isPaused ) {
		if ( imageList[ object.name ].moveFrame.includes( object.frame.name ) && object.body.blocked.down ) {
			object.body.velocity.y -= imageList[ object.name ].velocityY;
			object.body.velocity.x += object.dirRight ? imageList[ object.name ].velocityX : -imageList[ object.name ].velocityX;
		}
		if ( object.body.blocked.right ) {
			object.setFlipX( true );
			object.dirRight = false;
		} else if ( object.body.blocked.left ) {
			object.dirRight = true;
			object.setFlipX( false );
		}
	} else if ( object.body.blocked.down ) {
		object.body.velocity.x *= imageList[ object.name ].friction;
	}
};

function verticalUpdate( object ) {
	if ( object.anims.isPaused ) {
		object.anims.play( object.name + 'AnimStop' );
	} else {
		object.anims.play( object.name + 'Anim' );
		object.body.velocity.y -= imageList[ object.name ].velocityY;
	}
};

function limitLength( object, length ) {
	if ( objects.length > length ) {
		object[ 0 ].destroy();
		objects.shift();
	}
};

function eraseObjects() {
	objects.forEach( function( object ) {
		object.destroy();
	} );
	objects = [];
}

function arrowIncrement( num, scene ) {
	itemNumber = ( itemNumber + num ) % ( itemList.length );
	if ( itemNumber < 0 ) {
		itemNumber += itemList.length;
	}
	newObject = itemList[ itemNumber ];
	charSelect.destroy();
	charSelect = scene.add.image( 100, HEIGHT - 40, newObject + 'Sprites' )
		.setScale( imageList[ newObject ].scale * .5 );
}
