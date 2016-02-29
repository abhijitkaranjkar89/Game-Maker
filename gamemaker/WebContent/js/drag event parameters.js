var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
	preload : preload,
	create : create,
	render : render
});

function preload() {

	game.load.image('grid', 'resources/bg1.jpg');
	game.load.image('player', 'resources/sprite11.png');

}

var result = 'Drag a sprite';

function create() {

	game.stage.backgroundColor = "#D0F5A9";
	var bg = game.add.sprite(400, 0, 'grid');
	bg.width = 400;
	bg.height = 800;

	var sonic = game.add.sprite(0, 75, 'player');

	sonic.inputEnabled = true;
	sonic.input.enableDrag();
	sonic.events.onDragStart.add(onDragStart, this);
	sonic.events.onDragStop.add(onDragStop, this);

}

function onDragStart(sprite, pointer) {

	//result = "Dragging " + sprite.key;
	
	var sonic = game.add.sprite(0, 75, 'player');

	sonic.inputEnabled = true;
	sonic.input.enableDrag();
	sonic.events.onDragStart.add(onDragStart, this);
	sonic.events.onDragStop.add(onDragStop, this);


}

function onDragStop(sprite, pointer) {

	//result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;
	result = "Sprite dropped at x:" + pointer.x + " y: " + pointer.y;

}

function render() {

	game.debug.text(result, 10, 20);

}
