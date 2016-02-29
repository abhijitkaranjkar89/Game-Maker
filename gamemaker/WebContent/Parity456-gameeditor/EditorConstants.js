var gameInfo = {
	"board" : {
		"background-image" : "square",
		"background-image-path" : "images/square.png",
		"background-tint" : "0x1a1a1a",
		"width" : 800,
		"height" : 600
	},
	"physics" : {
		// game.physics.startSystem(Phaser.Physics.ARCADE);
		"type" : "ARCADE",
		"left-wall" : true,
		"right-wall" : true,
		"up-wall" : true,
		"down-wall" : false
	},
	"objects" : [
	/*
	 * { "name": "paddle", "group": "default", "sprite": "square",
	 * "sprite-path": "images/square.png", "tint": "0x009900", "width": 60,
	 * "height": 15, "anchor-x": 0.5, "anchor-y": 0.5, "start-x": 400,
	 * "start-y": 500, "velocity-x": 0, "velocity-y": 0, "check-bounds": true,
	 * "out-of-bounds-params": { //Parameters to factor in when the object goes
	 * out of bounds }, "collideable": true, "collide-with-bounds": true,
	 * "collide-behaviour": "bounce", "bounce-amount": 1, "collide-immovable":
	 * true }, { "name": "ball", "sprite": "circle", "sprite-path":
	 * "images/circle.png", "tint": "0x009900", "width": 30, "height": 30,
	 * "anchor-x": 0.5, "anchor-y": 0.5, "start-x": 400, "start-y": 400,
	 * "velocity-x": 100, "velocity-y": -100, "check-bounds": true,
	 * "out-of-bounds-params": { //Parameters to factor in when the object goes
	 * out of bounds }, "collideable": true, "collide-with-bounds": true,
	 * "collide-behaviour": "bounce", "bounce-amount": 1, "collide-immovable":
	 * false }, { "name": "brick1", "sprite": "square", "sprite-path":
	 * "images/square.png", "tint": "0x009900", "width": 60, "height": 15,
	 * "anchor-x": 0.5, "anchor-y": 0.5, "start-x": 400, "start-y": 100,
	 * "velocity-x": 0, "velocity-y": 0, "check-bounds": true,
	 * "out-of-bounds-params": { //Parameters to factor in when the object goes
	 * out of bounds }, "collideable": true, "collide-with-bounds": true,
	 * "collide-behaviour": "bounce", "bounce-amount": 1, "collide-immovable":
	 * true }, { "name": "brick2", "sprite": "square", "sprite-path":
	 * "images/square.png", "tint": "0x009900", "width": 60, "height": 15,
	 * "anchor-x": 0.5, "anchor-y": 0.5, "start-x": 300, "start-y": 100,
	 * "velocity-x": 0, "velocity-y": 0, "check-bounds": true,
	 * "out-of-bounds-params": { //Parameters to factor in when the object goes
	 * out of bounds }, "collideable": true, "collide-with-bounds": true,
	 * "collide-behaviour": "bounce", "bounce-amount": 1, "collide-immovable":
	 * true }, { "name": "brick1", "sprite": "square", "sprite-path":
	 * "images/square.png", "tint": "0x009900", "width": 60, "height": 15,
	 * "anchor-x": 0.5, "anchor-y": 0.5, "start-x": 500, "start-y": 100,
	 * "velocity-x": 0, "velocity-y": 0, "check-bounds": true,
	 * "out-of-bounds-params": { //Parameters to factor in when the object goes
	 * out of bounds }, "collideable": true, "collide-with-bounds": true,
	 * "collide-behaviour": "bounce", "bounce-amount": 1, "collide-immovable":
	 * true }
	 */
	],
	"input" : {
		"move-left" : [
		/*
		 * { "name": "paddle", "speed-x": 7, "speed-y": 7 }
		 */
		],
		"move-right" : [
		/*
		 * { "name": "paddle", "speed-x": 7, "speed-y": 7 }
		 */
		],
		"move-up" : [
		/*
		 * { "name": "paddle", "speed-x": 7, "speed-y": 7 }
		 */
		],
		"move-down" : [
		/*
		 * { "name": "paddle", "speed-x": 7, "speed-y": 7 }
		 */
		]
	}
}

var sprites = {
	"name" : "paddle",
	"group" : "default",
	"sprite" : "square",
	"sprite-path" : "images/square.png",
	"tint" : "0x009900",
	"width" : 60,
	"height" : 15,
	"anchor-x" : 0.5,
	"anchor-y" : 0.5,
	"start-x" : 400,
	"start-y" : 500,
	"velocity-x" : 0,
	"velocity-y" : 0,
	"check-bounds" : true,
	"out-of-bounds-params" : {
	// Parameters to factor in when the object goes out of bounds
	},
	"collideable" : true,
	"collide-with-bounds" : true,
	"collide-behaviour" : "bounce",
	"bounce-amount" : 1,
	"collide-immovable" : true
}
