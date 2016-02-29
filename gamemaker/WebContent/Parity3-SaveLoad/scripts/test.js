var testJson = {
    "board": {
        "background-image": "square",
        "background-image-path": "images/square.png",
        "background-tint": "0x1a1a1a",
        "width": 800,
        "height": 600
    },
    "physics": {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        "type": "ARCADE",
        "left-wall": true,
        "right-wall": true,
        "up-wall": true,
        "down-wall": false
    },
    "objects": [
        {
            "name": "paddle",
            "group": "default",
            "sprite": "square",
            "tint": "0x009900",
            "width": 60,
            "height": 15,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 400,
            "start-y": 500,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
        {
            "name": "ball",
            "sprite": "circle",
            "tint": "0x009900",
            "width": 15,
            "height": 15,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 400,
            "start-y": 400,
            "velocity-x": 100,
            "velocity-y": -100,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                "go-down"
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [

            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 1,
            "collide-immovable": false
        },
        {
            "name": "brick1",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 100,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick2",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 150,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick3",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 200,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick4",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 250,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick5",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 300,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick6",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 350,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        },
		{
            "name": "brick7",
            "sprite": "square",
            "tint": "0x009900",
            "width": 40,
            "height": 20,
            "anchor-x": 0.5,
            "anchor-y": 0.5,
            "start-x": 400,
            "start-y": 100,
            "velocity-x": 0,
            "velocity-y": 0,
            "random-move": false,
            "random-x": false,
            "random-y": false,
            "randomize-delay": 1000,
            "check-bounds": true,
            "oob-params": [
                //Parameters to factor in when the object goes out of bounds
            ],
            "collideable": true,
            "collide-with-bounds": true,
            "collide-behaviour": [
                "kill",
                "game-win-all"
            ],
            "collide-ignore": [ 
                
            ],
            "bounce-amount": 0,
            "collide-immovable": true
        }
    ],
    "input": {
        "move-left": [
            {
                "name": "paddle",
                "speed-x": -7,
				"speed-y": 0
            }
        ],
        "move-right": [
            {
                "name": "paddle",
                "speed-x": 7,
				"speed-y": 0
            }
        ],
        "move-up": [
             
        ],
        "move-down": [
			
        ]
    }
};

function testLoad()
{
	var jsonText = JSON.stringify(testJson);
	
	loadJson(jsonText);
}