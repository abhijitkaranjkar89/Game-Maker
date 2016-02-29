var game;

var gameInfo = {};
var boardInfo = gameInfo[INFO_BOARD];
var physicsInfo = gameInfo[INFO_PHYSICS];
var objectsInfo = gameInfo[INFO_OBJECTS];
var inputInfo = gameInfo[INFO_INPUT];
var gameObjects = [];
var groups = [];

//Maybe move this to an array of arrays and keys?
var leftInputObjects = [];
var rightInputObjects = [];
var upInputObjects = [];
var downInputObjects = [];

//Keep track of JavaScript intervals executing functions over time
var activeIntervals = [];

var lives = 3;
var score = 0;

var bg;
var gameText;

//Key inputs
var leftKey;
var rightKey;
var upKey;
var downKey;
var spaceKey;

//Options
var winCount = 0;
var loseCount = 0;
var startTime = 0;
var isPaused = false;
var isPlaying = false;

function loadJson(json)
{
	
	//$("div#phaserGame").show();
	//$("div#gameWindow").hide();
	
	gameInfo = JSON.parse(json);
	boardInfo = gameInfo[INFO_BOARD];
	physicsInfo = gameInfo[INFO_PHYSICS];
	objectsInfo = gameInfo[INFO_OBJECTS];
	inputInfo = gameInfo[INFO_INPUT];
	game = new Phaser.Game(boardInfo[BOARD_WIDTH], boardInfo[BOARD_HEIGHT], Phaser.AUTO, 'phaserGame', { preload: preload, create: create, update: update });
	clearBoard();
	
	isPlaying = true;
	
	//createBackground();
	//createPhysics();
	//setTimeout(createPhysics(), 1000)
	//setTimeout(createObjects(), 1000);
	//createObjects();
}


function reloadJson()
{
	clearBoard();
	createBackground();
	createPhysics();
	createObjects();
}


function getObject(name)
{
	for(var i=0; i< gameObjects.length; i++)
	{
		if(name === gameObjects[i].name)
		{
			return gameObjects[i];
		}
	}
}


function getObjectInfo(name)
{
	for(var i=0; i< objectsInfo.length; i++)
	{
		if(name === objectsInfo[i][OBJECTS_NAME])
		{
			return objectsInfo[i];
		}
	}
}


function clearBoard()
{
	for(var i=activeIntervals.length - 1; i >= 0; i--)
	{
		clearInterval(activeIntervals[i]);
	}
	
	for(var i=gameObjects.length - 1; i >= 0; i--)
	{
		gameObjects[i].destroy();
	}
	
	if(bg != null) bg.destroy();
	if(gameText != null) gameText.destroy();
	
	winCount = 0;
	loseCount = 0;
	
	activeIntervals = [];
	gameObjects = [];
}


function createPhysics()
{
	console.log("TEST P");
	
	//start physics
	//game.physics = new Phaser.Physics(game, Phaser.Physics.ARCADE);
	//game.physics.startSystem(Phaser.Physics.ARCADE);
	/*
	game.physics.arcade.checkCollision.left = physicsInfo[PHYSICS_LEFT_WALL];
	game.physics.arcade.checkCollision.right = physicsInfo[PHYSICS_RIGHT_WALL];
	game.physics.arcade.checkCollision.up = physicsInfo[PHYSICS_UP_WALL];
    game.physics.arcade.checkCollision.down = physicsInfo[PHYSICS_DOWN_WALL];
	*/
	console.log("PHYSICS: " + physicsInfo[PHYSICS_UP_WALL]);
}


function createBackground()
{
	//console.log(boardInfo);
	//Set up background image
    bg = game.add.tileSprite(0, 0, boardInfo[BOARD_WIDTH], boardInfo[BOARD_HEIGHT], boardInfo[BOARD_BG_IMAGE]);
	//bg.tint = boardInfo[BOARD_BG_TINT];
	bg.tint = 0x1a1a1a;
}

function createObjects()
{
	//Create text
	gameText = game.add.text(game.world.centerX, game.world.centerY, '', { font: "40px Arial", fill: "#ffffff", align: "left" });
	
	//Create game objects
	console.log("Creating objects");
	var loadedObjectInfo = [];
	
	for(var i = 0; i < objectsInfo.length; i++)
	{
		var index = i;
		var objectInfo = objectsInfo[index];
		var object;
		var group;
		
		//Phaser will loop for some reason without this check
		if(loadedObjectInfo.indexOf(objectInfo) != -1)  continue;
		else loadedObjectInfo.push(objectInfo);
		
		//console.log(objectInfo);
		
		for(var j = 0; j < groups.length; j++)
		{
			if(groups[j].name === objectInfo[OBJECTS_GROUP])
			{
				group = groups[j];
				break;
			}
		}
		
		if(group == null)
		{
			var groupName = objectInfo[OBJECTS_GROUP];
			
			if(groupName === "")
			{
				groupName = "default";
			}
			
			group = game.add.group(game.world, groupName);
			groups.push(group);
		}
		
		object = group.create(objectInfo[OBJECTS_X], objectInfo[OBJECTS_Y], objectInfo[OBJECTS_SPRITE]);
		object.name = objectInfo[OBJECTS_NAME];
		object.width = objectInfo[OBJECTS_WIDTH];
		object.height = objectInfo[OBJECTS_HEIGHT];
		
		object.anchor.setTo(objectInfo[OBJECTS_ANCHOR_X], objectInfo[OBJECTS_ANCHOR_Y]);
		//brick.tint = objectInfo[OBJECTS_TINT];
        
		if(objectInfo[OBJECTS_COL])
		{
			game.physics.enable(object, Phaser.Physics.ARCADE);
			object.body.bounce.set(objectInfo[OBJECTS_BOUNCE_AMOUNT]);
			object.body.immovable = objectInfo[OBJECTS_IMMOVABLE];
			object.body.collideWorldBounds = objectInfo[OBJECTS_COL_BOUNDS];
			object.body.velocity = new Phaser.Point(objectInfo[OBJECTS_VEL_X], objectInfo[OBJECTS_VEL_Y]);
			
			var colInfo = objectInfo[OBJECTS_COL_BEHAVIOUR];
			
			if(colInfo.indexOf(COL_GAME_WIN_ALL) != -1)
			{
				winCount++;
			}
			if(colInfo.indexOf(COL_GAME_OVER_ALL) != -1)
			{
				loseCountCount++;
			}
		}
		
		object.checkWorldBounds = objectInfo[OBJECTS_CHECK_BOUNDS];
		
		if(object.checkWorldBounds)
		{
			object.events.onOutOfBounds.add(boundsCheck, this);
		}
		
		if(objectInfo[OBJECTS_RANDOMIZE_MOVE])
		{
			var interval = setInterval(function() { randomizeDirection(object, objectInfo[OBJECTS_RANDOMIZE_X], objectInfo[OBJECTS_RANDOMIZE_Y]) }, objectInfo[OBJECTS_RANDOMIZE_DELAY])
			
			activeIntervals.push(interval);
		}
		
		gameObjects.push(object);
	}
	
	//Add objects controlled by player input
	var leftInputInfo = inputInfo[INPUT_MOVE_LEFT];
	var rightInputInfo = inputInfo[INPUT_MOVE_RIGHT];
	var upInputInfo = inputInfo[INPUT_MOVE_UP];
	var downInputInfo = inputInfo[INPUT_MOVE_DOWN];
	
	for(var i=0; i < leftInputInfo.length; i++)
	{
		var inputObject = leftInputInfo[i];
		leftInputObjects.push(inputObject);
	}
	
	for(var i=0; i < rightInputInfo.length; i++)
	{
		var inputObject = rightInputInfo[i];
		rightInputObjects.push(inputObject);
	}
	
	for(var i=0; i < upInputInfo.length; i++)
	{
		var inputObject = upInputInfo[i];
		upInputObjects.push(inputObject);
	}
	
	for(var i=0; i < downInputInfo.length; i++)
	{
		var inputObject = downInputInfo[i];
		downInputObjects.push(inputObject);
	}
}


function randomizeDirection(object, x, y)
{
	var speedX = 0;
	var speedY = 0;
	var dir = 1;
	
	if(x)
	{
		dir = Math.floor((Math.random() * 100) + 1);
		speedX = Math.floor((Math.random() * 100) + 1);
		
		if(dir < 50)
		{
			speedX *= -1;
		}
	}
	
	if(y)
	{
		dir = Math.floor((Math.random() * 100) + 1);
		speedY = Math.floor((Math.random() * 100) + 1);
		
		if(dir < 50)
		{
			speedY *= -1;
		}
	}
	
	object.body.velocity =  new Phaser.Point(speedX, speedY);
}


function checkOverlap(objectOne, objectTwo)
{
    var boundsA = objectOne.getBounds();
    var boundsB = objectTwo.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}


function collisionCheck(objectOne, objectTwo)
{
	console.log("TEST COL");
	
	var ob1Info = getObjectInfo(objectOne.name);
	var ob2Info = getObjectInfo(objectTwo.name);
	var ob1Colinfo = ob1Info[OBJECTS_COL_IGNORE];
	var ob2Colinfo = ob2Info[OBJECTS_COL_IGNORE];
	
	if(!objectOne.alive || !objectTwo.alive) return;
	if(ob1Colinfo.indexOf(ob2Info[OBJECTS_GROUP]) != -1) return;
	if(ob2Colinfo.indexOf(ob1Info[OBJECTS_GROUP]) != -1) return;
	
	game.physics.arcade.collide(objectOne, objectTwo);
	
	var objects = [ objectOne, objectTwo ];
	
	for(var i=0; i < objects.length; i++)
	{
		var objectInfo = getObjectInfo(objects[i].name);
		var colinfo = objectInfo[OBJECTS_COL_BEHAVIOUR];
		
		/*for(var j=0; j < objectsInfo.length; j++)
		{
			if(objectsInfo[j][OBJECTS_NAME] === objects[i].name)
			{
				colinfo = objectsInfo[j][OBJECTS_COL_BEHAVIOUR];
				break;
			}
		}*/
		
		//Determine what should happen during the collision
		for(var j=0; j < colinfo.length; j++)
		{
			var col = colinfo[j];
			
			switch(col)
			{
				case COL_KILL:
				objects[i].kill();
				break;
				
				case COL_GAME_WIN:
				gameWin();
				break;
				
				case COL_GAME_WIN_ALL:
				console.log(winCount);
				winCount--;
				if(winCount <= 0)
				{
					gameWin();
				}
				break;
				
				case COL_GAME_OVER:
				gameOver();
				break;
				
				case COL_GAME_OVER_ALL:
				loseCount--;
				if(loseCount <= 0)
				{
					gameOver();
				}
				break;
			}
		}
	}
}


function boundsCheck(object)
{
	var info = getObjectInfo(object.name);
	
	var params = info[OBJECTS_OOB_PARAMS];
	
	for(var i=0; i < params.length; i++)
	{
		var param = params[i];
		
		switch(param)
		{
			case OOB_GO_UP:
			if(object.y < 0)
			{
				gameOver();
			}
			break;
			
			case OOB_GO_DOWN:
			if(object.y > boardInfo[BOARD_HEIGHT])
			{
				gameOver();
			}
			break;
			
			case OOB_GO_LEFT:
			if(object.x < 0)
			{
				gameOver();
			}
			break;
			
			case OOB_GO_RIGHT:
			if(object.x > boardInfo[BOARD_WIDTH])
			{
				gameOver();
			}
			break;
			
			case OOB_GW_UP:
			if(object.y < 0)
			{
				gameWin();
			}
			break;
			
			case OOB_GW_DOWN:
			if(object.y > boardInfo[BOARD_HEIGHT])
			{
				gameWin();
			}
			break;
			
			case OOB_GW_LEFT:
			if(object.x < 0)
			{
				gameWin();
			}
			break;
			
			case OOB_GW_RIGHT:
			if(object.x > boardInfo[BOARD_WIDTH])
			{
				gameWin();
			}
			break;
		}
	}
}


function gameWin()
{
	gameText.text = 'You win!';
	isPlaying = false;
}


function gameOver ()
{
	gameText.text = 'Game Over!';
	isPlaying = false;
}


function onPauseClicked()
{
	isPaused = !isPaused;
	
	if(isPaused)
	{
		
	}
	else
	{
		
	}
}


function onStopClicked()
{
	
}


function preload()
{
	/*
	var loadedSprites = [];
	var newSprites = objectsInfo;
	var loader = new Phaser.Loader(game);
	//Load the default sprites
	for(var i = 0; i < newSprites.length; i++)
	{
		var spriteInfo = newSprites[i];
		if(loadedSprites.indexOf(spriteInfo[OBJECTS_SPRITE]) == -1)
		{
			console.log("Sprite loaded: [" + spriteInfo[OBJECTS_SPRITE] + "]");
			loadedSprites.push(spriteInfo[OBJECTS_SPRITE]);
			
			loader.image(spriteInfo[OBJECTS_SPRITE], "../gameeditor/assets/sprites/BreakoutGame/ball1.png");			
			alert(spriteInfo[OBJECTS_SPRITE]+"   "+spriteInfo[OBJECTS_PATH])
		}
	}
	
	loader.start();
	*/
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Load sprites
	var newSprites = defaultSprites[SPRITE_SECTION];
	var loadedSprites = [];
	
	//Load the default sprites
	for(var i = 0; i < newSprites.length; i++)
	{
		var spriteInfo = newSprites[i];
		if(loadedSprites.indexOf(spriteInfo[SPRITE_NAME]) == -1)
		{
			console.log("Sprite loaded: [" + spriteInfo[SPRITE_NAME] + "]");
			loadedSprites.push(spriteInfo[SPRITE_NAME]);
			game.load.image(spriteInfo[SPRITE_NAME], spriteInfo[SPRITE_PATH]);
		}
	}
	
	//Assign key values
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function create()
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.physics.arcade.checkCollision.left = physicsInfo[PHYSICS_LEFT_WALL];
	game.physics.arcade.checkCollision.right = physicsInfo[PHYSICS_RIGHT_WALL];
	game.physics.arcade.checkCollision.up = physicsInfo[PHYSICS_UP_WALL];
    game.physics.arcade.checkCollision.down = physicsInfo[PHYSICS_DOWN_WALL];
}


function update () 
{
	if(isPlaying)
	{
		if (leftKey.isDown)
		{
			for(var i=0; i < leftInputObjects.length; i++)
			{
				var inputInfo = leftInputObjects[i];
				
				for(var j=0; j < gameObjects.length; j++)
				{
					if(gameObjects[j].name == inputInfo[INPUT_TARGET_NAME])
					{
						gameObjects[j].x += inputInfo[INPUT_TARGET_SPEED_X];
						gameObjects[j].y += inputInfo[INPUT_TARGET_SPEED_Y];
						//gameObjects[j].body.velocity = new Phaser.Point(inputInfo[INPUT_TARGET_SPEED_X], inputInfo[INPUT_TARGET_SPEED_Y]);
						break;
					}
				}
			}
		}
		
		if (rightKey.isDown)
		{
			for(var i=0; i < rightInputObjects.length; i++)
			{
				var inputInfo = rightInputObjects[i];
				
				for(var j=0; j < gameObjects.length; j++)
				{
					if(gameObjects[j].name == inputInfo[INPUT_TARGET_NAME])
					{
						gameObjects[j].x += inputInfo[INPUT_TARGET_SPEED_X];
						gameObjects[j].y += inputInfo[INPUT_TARGET_SPEED_Y];
						//gameObjects[j].body.velocity = new Phaser.Point(inputInfo[INPUT_TARGET_SPEED_X], inputInfo[INPUT_TARGET_SPEED_Y]);
						break;
					}
				}
			}
		}
		
		if (upKey.isDown)
		{
			for(var i=0; i < upInputObjects.length; i++)
			{
				var inputInfo = upInputObjects[i];
				
				for(var j=0; j < gameObjects.length; j++)
				{
					if(gameObjects[j].name == inputInfo[INPUT_TARGET_NAME])
					{
						gameObjects[j].x += inputInfo[INPUT_TARGET_SPEED_X];
						gameObjects[j].y += inputInfo[INPUT_TARGET_SPEED_Y];
						//gameObjects[j].body.velocity = new Phaser.Point(inputInfo[INPUT_TARGET_SPEED_X], inputInfo[INPUT_TARGET_SPEED_Y]);
						break;
					}
				}
			}
		}
		
		if (downKey.isDown)
		{
			for(var i=0; i < downInputObjects.length; i++)
			{
				var inputInfo = downInputObjects[i];
				
				for(var j=0; j < gameObjects.length; j++)
				{
					if(gameObjects[j].name == inputInfo[INPUT_TARGET_NAME])
					{
						gameObjects[j].x += inputInfo[INPUT_TARGET_SPEED_X];
						gameObjects[j].y += inputInfo[INPUT_TARGET_SPEED_Y];
						//gameObjects[j].body.velocity = new Phaser.Point(inputInfo[INPUT_TARGET_SPEED_X], inputInfo[INPUT_TARGET_SPEED_Y]);
						break;
					}
				}
			}
		}
		/*
		if(!leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown)
		{
			for(var i=0; i < leftInputObjects.length; i++)
			{
				var target = getObject(leftInputObjects[i][INPUT_TARGET_NAME]);
				target.body.velocity = new Phaser.Point(0, 0);
			}
			for(var i=0; i < rightInputObjects.length; i++)
			{
				var target = getObject(rightInputObjects[i][INPUT_TARGET_NAME]);
				target.body.velocity = new Phaser.Point(0, 0);
			}
			for(var i=0; i < upInputObjects.length; i++)
			{
				var target = getObject(upInputObjects[i][INPUT_TARGET_NAME]);
				target.body.velocity = new Phaser.Point(0, 0);
			}
			for(var i=0; i < downInputObjects.length; i++)
			{
				var target = getObject(downInputObjects[i][INPUT_TARGET_NAME]);
				target.body.velocity = new Phaser.Point(0, 0);
			}
		}
		*/
		
		if(isPlaying && !isPaused)
		{
			
		}
	
		//Collisions
		for(var i = 0; i < gameObjects.length; i++)
		{
			for(var j = 0; j < gameObjects.length; j++)
			{
				if(j != i)
				{
					if(checkOverlap(gameObjects[i], gameObjects[j]))
					{
						collisionCheck(gameObjects[i], gameObjects[j]);
					}
					//game.physics.overlap(gameObjects[i], gameObjects[j], collisionCheck, null, this);
					//game.physics.arcade.collide(gameObjects[i], gameObjects[j], collisionCheck, null, this);
				}
			}
		}
	}
}



