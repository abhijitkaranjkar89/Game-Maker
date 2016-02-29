function saveGameConfig(gameName, jsonConfig, gameId)	{
	
	var jsonString = JSON.stringify(jsonConfig);
	var gameData = {gameName:gameName, gameId:gameId, gameConfig:jsonString};
	
	//alert("/WebGameMaker/saveGameConfig.do");
	/*$.ajax({
	    url : "/WebGameMaker/saveGameConfig.do",
	    type: "POST",
	    data : gameData,
	    success: function(data, textStatus, jqXHR)
	    {
	        console.log(data);
	        gameId = data;
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert('Something went wrong!');
	    }
	});*/
	
	$.ajax({
		type : "POST",
		url : "/WebGameMaker/saveGameConfig.do",
		data : gameData,
		timeout : 100000,
		success : function(data) {
			console.log("SUCCESS: ", data);
			alert(data);
			gameId = data;
		},
		error : function(e) {
			console.log("ERROR: ", e);
			display(e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}