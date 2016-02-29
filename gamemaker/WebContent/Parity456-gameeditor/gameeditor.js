// drawing the accordion
$("#accordion").accordion({
	heightStyle : "fill"
	/*heightStyle : "content",
	autoHeight : false,
	clearStyle : true,*/
});

/*
 * $('#sprite').ddslick({ showSelectedHTML : false, onSelected : function(data) {
 * window.spindex = data.selectedData.value; } });
 */

// Dropdown plugin data
var ddData = [ {
	value : "assets/sprites/BreakoutGame/ball1.png",
	imageSrc : "assets/sprites/BreakoutGame/ball1.png"
}, {
	value : "assets/sprites/BreakoutGame/brick1.png",
	imageSrc : "assets/sprites/BreakoutGame/brick1.png"
}, {
	value : "assets/sprites/BreakoutGame/paddle1.png",
	imageSrc : "assets/sprites/BreakoutGame/paddle1.png"
}, {
	value : "assets/sprites/FroggerGame/car3.png",
	imageSrc : "assets/sprites/FroggerGame/car3.png"
}, {
	value : "assets/sprites/FroggerGame/frog1.png",
	imageSrc : "assets/sprites/FroggerGame/frog1.png"
},
{
	value : "assets/sprites/PacmanGame/food.png",
	imageSrc : "assets/sprites/PacmanGame/food.png"
},
{
	value : "assets/sprites/PacmanGame/pacman.png",
	imageSrc : "assets/sprites/PacmanGame/pacman.png"
}, {
	value : "assets/sprites/PacmanGame/pacmanGhost1.png",
	imageSrc : "assets/sprites/PacmanGame/pacmanGhost1.png"
} ];

$('#sprite').ddslick({
	data : ddData,
	width : 200,
	imagePosition : "center",
	selectText : "Select Sprite",
	onSelected : function(data) {
		// console.log(data);
		// alert(data.selectedData.value);
		// data.selectedData.value;
		spriteImage = data.selectedData.value;
	}
});

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamepanel', {
	preload : editorPreload,
	create : editorCreate,
	render : render
});

var bg0, bg1, bg2, bg3, bg4;

function editorPreload() {
	game.load.image('bg0', 'assets/backgrounds/blank.png');
	game.load.image('bg1', 'assets/backgrounds/mountains.png');
	game.load.image('bg2', 'assets/backgrounds/desert.png');
	game.load.image('bg3', 'assets/backgrounds/city.png');
	game.load.image('bg4', 'assets/backgrounds/underwater.png');
}

var result = 'Drag a sprite';

function editorCreate() {
	game.load.image('bg0', 'assets/backgrounds/blank.png');

	window.bg0 = game.add.image(0, 0, 'bg0');
	window.bg1 = game.add.image(0, 0, 'bg1');
	window.bg2 = game.add.image(0, 0, 'bg2');
	window.bg3 = game.add.image(0, 0, 'bg3');
	window.bg4 = game.add.image(0, 0, 'bg4');

	window.bg0.visible = false;
	window.bg1.visible = false;
	window.bg2.visible = false;
	window.bg3.visible = false;
	window.bg4.visible = false;
}

function onDragStart(sprite, pointer) {
	result = "Dragging " + sprite.key;
}

var currentsprite;
var currentpointer;
var spindex;
var spritename;
var spritex;
var spritey;
var spriteWidth;
var spriteHeight;

function onDragStop(sprite, pointer) {
	result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;
	window.currentsprite = sprite;
	window.currentpointer = pointer;
	window.spritename = sprite.key;
	window.spritex = pointer.x;
	window.spritey = pointer.y;
	window.spriteWidth = sprite.width;
	window.spriteHeight = sprite.height;

	document.getElementById('spriteName').value = window.spritename;
	document.getElementById('editSpriteX').value = window.spritex;
	document.getElementById('editSpriteY').value = window.spritey;
	document.getElementById('editSpriteWidth').value = sprite.width;
	document.getElementById('editSpriteHeight').value = sprite.height;
	// editSprite();
}

function render() {
	game.debug.text(result, 10, 20);
}

function editSpritePhaser() {
	// var spritex = document.getElementById('editSpriteX').value;
	// var spritey = document.getElementById('editSpriteY').value;
	var spriteWidth = document.getElementById('editSpriteWidth').value;
	var spriteHeight = document.getElementById('editSpriteHeight').value;
	// window.currentsprite.x = spritex;
	// window.currentsprite.y = spritey;
	alert("Width height : " + spriteWidth + "   " + spriteHeight)
	window.currentsprite.width = spriteWidth;
	window.currentsprite.height = spriteHeight;
	editSprite();
}

function addSpritePhaser(spindex, x, y, w, h, imagepath) {
	loader = new Phaser.Loader(game)
	loader.image("sprite_" + spindex, imagepath);
	loader.start()
	var sprite = game.add.sprite(x, y, "sprite_" + spindex);
	sprite.inputEnabled = true;
	sprite.input.enableDrag();
	sprite.events.onDragStart.add(onDragStart, this);
	sprite.events.onDragStop.add(onDragStop, this);
}

function onSpriteClick(sprite, pointer) {

}

function wallCheck() {
	var topWall = document.getElementById("TopWall").checked;
	var bottomWall = document.getElementById("BottomWall").checked;
	var leftWall = document.getElementById("LeftWall").checked;
	var rightWall = document.getElementById("RightWall").checked;
}

function checkIfKeyPress() {
	if (document.getElementById("events").value == "onKeyPress") {
		document.getElementById("options").disabled = false;
	} else {
		document.getElementById("options").disabled = true;
	}
}

function removeSpritePhaser() {
	window.currentsprite.destroy();
}

function changeBackground() {
	var b = document.getElementById("background");
	var bgindex = b.options[b.selectedIndex].value;
	window.bg0.visible = false;
	window.bg1.visible = false;
	window.bg2.visible = false;
	window.bg3.visible = false;
	window.bg4.visible = false;
	var bgimage;
	switch (bgindex) {
	case "1":
		window.bg1.visible = true;
		bgimage = 'assets/backgrounds/mountains.png';
		break;
	case "2":
		window.bg2.visible = true;
		bgimage = 'assets/backgrounds/desert.png'
		break;
	case "3":
		window.bg3.visible = true;
		bgimage = 'assets/backgrounds/city.png';
		break;
	case "4":
		window.bg4.visible = true;
		bgimage = 'assets/backgrounds/underwater.png';
		break;
	default:
		window.bg0.visible = true;
		bgimage = 'assets/backgrounds/blank.png';
	}

	addBackground(bgimage);
}

