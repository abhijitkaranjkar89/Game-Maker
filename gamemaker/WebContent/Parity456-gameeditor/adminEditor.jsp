<%@include file="/jsp/home.jsp"%>

<script src="gameeditor/phaser.js"></script>
<script src="gameeditor/jquery-ui-1.11.4/external/jquery/jquery.js"></script>
<script src="gameeditor/jquery-ui-1.11.4/jquery-ui.js"></script>
<script src="gameeditor/jquery.ddslick.js"></script>
<script src="gameeditor/gameConfig.js"></script>
<script
	src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.2.min.js"></script>
<link href="gameeditor/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="gameeditor/gameeditor.css">

</head>

<body>
	<%@include file="/jsp/userDetails.jsp"%>
	<div id="gamepanel"></div>
	<div id="accordion-resizer">
		<div id="accordion" class="wrapper">

			<h3>Select Sprite</h3>
			<div>
				<p>Please select sprite</p>
				<select id="sprite">
					<option value="none" >-- Select --</option>
					<option value="ball" data-imagesrc="gameeditor/assets/sprites/BreakoutGame/ball2.png">Ball</option>
					<option value="brick" data-imagesrc="gameeditor/assets/sprites/BreakoutGame/brick1.png">Brick</option>
					<option value="paddle" data-imagesrc="gameeditor/assets/sprites/BreakoutGame/paddle1.png">Paddle</option>
				</select>
				<p>X: <input id="x" type="text" value="300" style="width:50px;"></input>
				Y: <input id="y" type="text" value="200" style="width:50px;"></input>
				</p>
				<button onclick="addSprite()">Add Sprite</button>
			</div>

			<h3>Edit Sprite</h3>
			<div>
				Current Sprite is:
				<input id="spritename" type="text"  style="width:50px;"></input>
				<p>X: <input id="spritex" type="text" style="width:50px;"></input>
				</p>Y: <input id="spritey" type="text" style="width:50px;"></input>
				<button onclick="editSprite()">Edit Sprite</button>
			</div>

			<h3>Select Events</h3>
			<div>
				<p>List of events</p>

			</div>


			<h3>Objective Management</h3>
			<div>
				<p>Win/Lose Condition</p>
			</div>

			<h3>Background Image</h3>
			<div>
				<p>Select Background Image</p>
				<select id="background" onchange="changeBackground()">
					<option value="0">-- Select --</option>
					<option value="1">Mountains</option>
					<option value="2">Desert</option>
					<option value="3">City</option>
					<option value="4">Under water</option>
				</select>
			</div>

			<h3>Save/Load</h3>
			<div>
				<p>Play Pause Save Load</p>
			</div>

		</div>
	</div>
	<script src="gameeditor/gameeditor.js"></script>
</body>
</html>