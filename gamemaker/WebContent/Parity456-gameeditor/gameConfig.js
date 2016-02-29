var gameName;
var gameConfig;
var spriteindex = 0;
var boardConfig;
var gameId;
var spriteEventAction;
var spriteImage = "";
var moveLeft;
var moveRight;
var moveUp;
var moveDown;
var onCollision;
var onUpdate;
var onKeyPress;
var onOutOfBounds;

var physicsConfig = {
	"type" : "ARCADE",
	"left-wall" : true,
	"right-wall" : true,
	"up-wall" : true,
	"down-wall" : true
};
var objectsConfig;
var inputConfig;

function initializeObjects() {
	gameConfig = {};
	boardConfig = {};
	objectsConfig = [];
	inputConfig = {};
	onCollision = [];
	onUpdate = [];
	onKeyPress = [];
	onOutOfBounds = [];
	spriteEventAction = {};
	moveLeft = [];
	moveRight = [];
	moveUp = [];
	moveDown = [];
	gameName = "";
	gameId = "";
	spriteindex = 0;

	inputConfig["move-left"] = moveLeft;
	inputConfig["move-right"] = moveRight;
	inputConfig["move-up"] = moveUp;
	inputConfig["move-down"] = moveDown;

	spriteEventAction["onCollision"] = onCollision;
	spriteEventAction["onUpdate"] = onUpdate;
	spriteEventAction["onKeyPress"] = onKeyPress;
	spriteEventAction["onOutOfBounds"] = onOutOfBounds;

	gameConfig["board"] = boardConfig;
	gameConfig["physics"] = physicsConfig;
	gameConfig["objects"] = objectsConfig;
	gameConfig["input"] = inputConfig;
	gameConfig["spriteEventAction"] = spriteEventAction;

}

function addGame() {

	initializeObjects();
	gameName = $("#gamename").val()
	boardConfig["background-tint"] = "0x1a1a1a";
	boardConfig["width"] = "800";
	boardConfig["height"] = "600";

	/*
	 * Create/Insert Game name in database and get an ID make a AJAX call here
	 */
	saveGameConfig(gameName, gameConfig, gameId);

}

function addSprite() {

	var spriteX = $("#spriteX").val()
	var spriteY = $("#spriteY").val()
	var spriteWidth = $("#spriteWidth").val()
	var spriteHeight = $("#spriteHeight").val()
	// var spriteImage = $("#sprite").val()

	var spriteObject = {};

	spriteindex++;

	addSpritePhaser(spriteindex, spriteX, spriteY, spriteWidth, spriteHeight,
			spriteImage);

	spriteObject["name"] = "sprite_" + spriteindex;
	spriteObject["sprite"] = "sprite_" + spriteindex;
	spriteObject["sprite-path"] = spriteImage;
	spriteObject["tint"] = "0x009900";
	spriteObject["width"] = parseInt(spriteWidth);
	spriteObject["height"] = parseInt(spriteHeight);
	spriteObject["anchor-x"] = 0.5;
	spriteObject["anchor-y"] = 0.5;
	spriteObject["start-x"] = parseInt(spriteX);
	spriteObject["start-Y"] = parseInt(spriteY);
	spriteObject["velocity-x"] = 0;
	spriteObject["velocity-y"] = 0;
	spriteObject["check-bounds"] = true;
	spriteObject["out-of-bounds-params"] = {};
	spriteObject["collideable"] = true;
	spriteObject["collide-with-bounds"] = true;
	spriteObject["collide-behaviour"] = true;
	spriteObject["bounce-amount"] = 1;
	spriteObject["collide-immovable"] = true;

	objectsConfig.push(spriteObject);

	/*
	 * Make Ajax Call to save
	 */
	
	saveGameConfig(gameName, gameConfig, gameId);

}

function editSprite() {

	var spriteName = $("#spriteName").val()
	var spriteX = $("#editSpriteX").val()
	var spriteY = $("#editSpriteY").val()
	var width = $("#editSpriteWidth").val()
	var height = $("#editSpriteHeight").val()

	var spriteObject = findSprite(spriteName);

	if (null != spriteObject) {

		spriteObject["width"] = width;
		spriteObject["height"] = height;

		spriteObject["start-x"] = parseInt(spriteX);
		spriteObject["start-Y"] = parseInt(spriteY);

	}

	/*
	 * Make Ajax Call to save changed sprites
	 */
	saveGameConfig(gameName, gameConfig, gameId);

}

function findSprite(spriteName) {

	var temp;
	for (var i = 0; i < objectsConfig.length; i++) {

		temp = objectsConfig[i];

		if (null != temp && temp["name"] == spriteName) {

			return objectsConfig[i];
		}

	}

}

function removeSprite() {

	var spriteName = $("#spriteName").val()

	removeSpritePhaser();

	if (null != spriteName) {
		for (var i = 0; i < objectsConfig.length; i++) {

			temp = objectsConfig[i];

			if (null != temp && temp["name"] == spriteName) {

				alert("Found in list");
				objectsConfig.splice(i, 1);
			}

		}

	}

	/*
	 * Make Ajax Call to save changed sprites
	 */
	
	saveGameConfig(gameName, gameConfig, gameId);

}

function addBackground(bgimage) {

	// var gameBackground = $("#background").val()

	boardConfig["background-image-path"] = bgimage;

	/*
	 * Make Ajax call
	 */
	saveGameConfig(gameName, gameConfig, gameId);

}

function addActionEvents() {

	var spriteName = $("#spriteName").val()
	var event = $("#events").val()
	var keyOption = $("#options").val();
	var action = $("#actions").val()

	var spriteObject = findSprite(spriteName);
	var eventActionMapping = {};

	if (null != spriteObject) {

		eventActionMapping["action"] = action;
		eventActionMapping["name"] = spriteName;

		if (event == "onKeyPress") {

			var actionEvent={};
			actionEvent["name"] = spriteName;
			actionEvent["speed-x"] = 7;
			actionEvent["speed-y"] = 7;

			

			switch (keyOption) {
			case "move-left":
				moveLeft.push(actionEvent);

				break;
			case "move-right":
				moveRight.push(actionEvent);
				break;
			case "move-up":
				moveUp.push(actionEvent);
				break;
			case "move-down":
				moveDown.push(actionEvent);
				break;
			default:
				return;
			}

			onKeyPress.push(eventActionMapping);
			
			return;
		}

		if (event == "onUpdate") {

			if(action == "random")	{
				
				spriteObject["velocity-x"] = 100;
				spriteObject["velocity-y"] = -100;
				
				return;
			}
			
			switch (keyOption) {
			case "move-left":
				spriteObject["velocity-x"] = -100;

				break;
			case "move-right":
				spriteObject["velocity-x"] = 100;
				break;
			case "move-up":
				spriteObject["velocity-y"] = -100;
				break;
			case "move-down":
				spriteObject["velocity-y"] = 100;
				break;
			case "random":
				
				break;
			default:
				return;
			}

			onUpdate.push(eventActionMapping);
			return;
		}

		if (action == "bounce") {
			spriteObject["bounce-amount"] = 1;

			return;
		}

		if (event == "onCollision") {

			onCollison.push(eventActionMapping);

			return;

		}

		if (event == "onOutOfBounds") {

			onOutOfBounds.push(eventActionMapping);

			return;

		}

	}
	/*
	 * Make Ajax Call to save changed sprites
	 */
	saveGameConfig(gameName, gameConfig, gameId);

}

function onSaveClicked() {

	alert("Json Object : " + JSON.stringify(gameConfig));
	console.log("Json Object : " + JSON.stringify(gameConfig));
	saveGameConfig(gameName, gameConfig, gameId);
}

function onPlayClicked()	{
	
	
	//$('gameWindow').show();
	alert('hidingsss! :P');
	$('editorWindow').hide();
	$('.gamepanel').hide();
	$("div#gamepanel").hide();
	$("div#phaserGame").show();
	$("div#gameWindow").show();
	
	loadJson(JSON.stringify(gameConfig));
	
	
}

function onPauseClicked()	{
	
	//$('gameWindow').hide();
	$('editorWindow').show();
	$('.gamepanel').hide();
	$("div#gamepanel").show();
	$("div#phaserGame").hide();
	$("div#gameWindow").hide();
	
}