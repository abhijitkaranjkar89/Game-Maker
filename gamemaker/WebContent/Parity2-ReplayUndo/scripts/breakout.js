var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload()
{
	
    game.load.image('starfield', 'images/starfield.jpg');
	game.load.image('brick', 'images/square.png');
	game.load.image('ball', 'images/circle.png');
}

//Constants
var paddleObject = "Paddle";
var ballObject = "Ball";
var brickObject = "Brick-";

//Game Objects
var ball;
var paddle;
var bricks;

//Movement (This will be handled by JSON later)
var speed = 7;

var ballOnPaddle = true;

var lives = 3;
var score = 0;

//UI
var scoreText;
var livesText;
var introText;

var s;

//Key inputs
var leftKey;
var rightKey;
var spaceKey;

//Buttons
var pauseButton;
var stopButton;
var undoButton;
var replayButton;
var pauseText;
var stopText;
var undoText;
var replayText;

//Events
var events = [];
var replayEvents = [];

//Options
var startTime = 0;
var isPaused = false;
var isPlaying = false;
var isReplaying = false;
var cachedVelocity = new Phaser.Point();
var eventIndex = 0;

function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'starfield');
	s.tint = 0x1a1a1a;

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'brick');
			brick.width = 30;
			brick.height = 15;
			brick.tint = 0x990000;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, 'brick');
	paddle.width = 60;
	paddle.height = 15;
	paddle.tint = 0x009900;
	paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'ball');
	ball.width = 12;
	ball.height = 12;
	ball.tint = 0xffcc00;
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.events.onOutOfBounds.add(ballLost, this);

    scoreText = game.add.text(680, 500, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- Press Space -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	spaceKey.onDown.add(releaseBall, this);
	
	pauseButton = game.add.button(5, game.world.height - 35, 'brick', onPauseClicked, this);
	stopButton = game.add.button(135, game.world.height - 35, 'brick', onStopClicked, this);
	undoButton = game.add.button(265, game.world.height - 35, 'brick', onUndoClicked, this);
	replayButton = game.add.button(395, game.world.height - 35, 'brick', onReplayClicked, this);
	
	pauseButton.width = 125;
	pauseButton.height = 30;
	stopButton.width = 125;
	stopButton.height = 30;
	undoButton.width = 125;
	undoButton.height = 30;
	replayButton.width = 125;
	replayButton.height = 30;
	
	pauseText = game.add.text(25, game.world.height - 35, 'Pause', { font: "20px Arial", fill: "#000000", align: "left" });
    stopText = game.add.text(155, game.world.height - 35, 'Stop', { font: "20px Arial", fill: "#000000", align: "left" });
	undoText = game.add.text(285, game.world.height - 35, 'Undo', { font: "20px Arial", fill: "#000000", align: "left" });
    replayText = game.add.text(415, game.world.height - 35, 'Replay', { font: "20px Arial", fill: "#000000", align: "left" });
	
	//pauseButton.inputEnabled = false;
	//stopButton.inputEnabled = false;
	//undoButton.inputEnabled = false;
	//replayButton.inputEnabled = false;
}

function update () 
{
	if(isPlaying && !isPaused)
	{
		if (leftKey.isDown)
		{
			paddle.x = paddle.x - speed;
		}
		else if (rightKey.isDown)
		{
			paddle.x = paddle.x + speed;
		}

		if (paddle.x < (paddle.width / 2))
		{
			paddle.x = (paddle.width / 2);
		}
		else if (paddle.x > game.width - (paddle.width / 2))
		{
			paddle.x = game.width - (paddle.width / 2);
		}

		if (ballOnPaddle)
		{
			ball.body.x = paddle.x;
		}
		else
		{
			game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
			game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
		}
	}
}

function releaseBall ()
{
	if(!isPlaying)
	{
		isPlaying = true;
		pauseButton.inputEnabled = true;
		//undoButton.inputEnabled = false;
		//replayButton.inputEnabled = false;
		events = [];
		replayEvents = [];
		startTime = game.time.now;
	}
	
    if (ballOnPaddle)
    {
		takeSnapshot();
		
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        introText.visible = false;
    }
}

function ballLost ()
{
    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);
    }
}

function gameOver ()
{
    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (_ball, _brick)
{
    _brick.kill();

    score += 10;

    scoreText.text = 'score: ' + score;
	
	//Record object positions
	takeSnapshot();

    //  Are they any bricks left?
    if (bricks.countLiving() == 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
    }
}

function ballHitPaddle (_ball, _paddle)
{
    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }
	
	takeSnapshot();
}

//Takes a snapshot of the game and stores all objects' positions and velocity as well as misc. info.
function takeSnapshot()
{
	if(isReplaying) return;
		
	var info = {};

	for(var i=0; i < bricks.length; i++)
	{
		var brickInfo = {};
		
		brickInfo["pos-x"] = bricks.getAt(i).x;
		brickInfo["pos-y"] = bricks.getAt(i).y;
		brickInfo["vel-x"] = bricks.getAt(i).body.velocity.x;
		brickInfo["vel-y"] = bricks.getAt(i).body.velocity.y;
		brickInfo["state"] = bricks.getAt(i).alive;
		brickInfo["target"] = bricks.getAt(i);
		
		info[(brickObject + i)] = brickInfo;
	}
	
	var ballInfo = {};
	
	ballInfo["pos-x"] = ball.x;
	ballInfo["pos-y"] = ball.y;
	ballInfo["vel-x"] = ball.body.velocity.x;
	ballInfo["vel-y"] = ball.body.velocity.y;
	
	var paddleInfo = {};
	
	paddleInfo["pos-x"] = paddle.x;
	paddleInfo["pos-y"] = paddle.y;
	paddleInfo["vel-x"] = paddle.body.velocity.x;
	paddleInfo["vel-y"] = paddle.body.velocity.y;
	
	var gameInfo = {};
	
	gameInfo["lives"] = lives;
	gameInfo["score"] = score;
	gameInfo["bop"] = ballOnPaddle;
	gameInfo["time"] = game.time.now;
	
	info["ball"] = ballInfo;
	info["paddle"] = paddleInfo;
	info["game"] = gameInfo;
	
	events.push(info);
}

function replayEvent()
{
	//console.log(JSON.stringify(replayEvents));
	var info = replayEvents.pop();
	console.log(JSON.stringify());
	var targetTime = startTime;
	
	if(replayEvents.length > 0)
	{
		var nextInfo = replayEvents[replayEvents.length - 1];
		targetTime = nextInfo["game"]["time"];
	}
	else
	{
		isReplaying = false;
	}
	
	game.add.tween(ball).to( { x: info["ball"]["pos-x"], y: info["ball"]["pos-y"] }, info["game"]["time"] - targetTime, Phaser.Easing.Linear.None, true);
}

function onPauseClicked()
{
	isPaused = !isPaused;
	
	if(isPaused)
	{
		pauseText.text = 'Resume';
		cachedVelocity = ball.body.velocity;
		ball.body.velocity = new Phaser.Point();
		undoButton.inputEnabled = true;
		eventIndex = events.length - 1;
	}
	else
	{
		pauseText.text = 'Pause';
		ball.body.velocity = cachedVelocity;
		//undoButton.inputEnabled = false;
	}
}

function onStopClicked()
{
	score = 0;
	lives = 3;
	scoreText.text = 'score: ' + score;
	livesText.text = 'lives: ' + lives;
    introText.text = '- Press Space -';
	introText.visible = true;

    //  Let's move the objects into position
	paddle.x = game.world.centerX;
    ballOnPaddle = true;
    ball.body.velocity.set(0);
    ball.x = paddle.x + 16;
    ball.y = paddle.y - 16;

    //  And bring the bricks back from the dead :)
    bricks.callAll('revive');
	
	isPaused = false;
	isPlaying = false;
	
	pauseButton.inputEnabled = false;
	undoButton.inputEnabled = false;
	replayButton.inputEnabled = true;
	
	eventIndex = events.length;
}

function onUndoClicked()
{
	if(eventIndex >= 0)
	{
		var info = events.pop();
		eventIndex--;
		
		for(var i=0; i < bricks.length; i++)
		{
			var brickInfo = info[(brickObject + i)];
			
			if(brickInfo["state"] === true)
			{
				brickInfo["target"].revive();
			}
			else
			{
				brickInfo["target"].kill();
			}
		}
		
		var ballInfo = info["ball"];
		
		ball.x = ballInfo["pos-x"];
		ball.y = ballInfo["pos-y"];
		cachedVelocity = new Phaser.Point(ballInfo["vel-x"], ballInfo["vel-y"]);
		
		var paddleInfo = info["paddle"];
		
		paddle.x = paddleInfo["pos-x"] ;
		paddle.y = paddleInfo["pos-y"] ;
		
		var gameInfo = info["game"];
		
		lives = gameInfo["lives"];
		score = gameInfo["score"];
		ballOnPaddle = gameInfo["bop"];
		
		scoreText.text = 'score: ' + score;
		livesText.text = 'lives: ' + lives;
	}
}

function onReplayClicked()
{
	if(!isReplaying)
	{
		console.log("Test");
		isReplaying = true;
		
		
		replayEvents = events;
			
		replayEvents.reverse();
		
		var newEvents = replayEvents;
		
		for(var i=newEvents.length-1; i >= 0; i--)
		{
			var info = newEvents.pop();
			
			console.log(i);
			
			
			game.time.events.add(info["game"]["time"] - startTime, replayEvent, this);
			
			console.log("TEST: " + info["game"]["time"] - startTime);
			
			
		}
		//game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
		//game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	}
}	