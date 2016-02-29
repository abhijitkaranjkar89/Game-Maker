package com.webgamemaker.utility;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.webgamemaker.entity.Game;
import com.webgamemaker.entity.Sprite;

public class JSONUtility {

	public static Object getObjectFromJsonString(String jsonString) throws ParseException {

		Sprite sprite = null;
		JSONParser parser = new JSONParser();
		int width, height;
		String imagePath;
		String gameName, gameId, backgroundImage, temp;
		Game game = new Game();

		JSONObject obj = (JSONObject) parser.parse(jsonString);

		if (obj.containsKey("gameName")) {

			temp = obj.get("gameName").toString();
			game.setGameName(temp);
			
		}
		
		if (obj.containsKey("bgimage")) {

			temp = obj.get("bgimage").toString();
			
			if(temp != null)	{
				
			}
			//game.setBackgroundSpriteId();
			
		}


		
		/*try {
			JSONObject obj = (JSONObject) parser.parse(jsonString);

			if (obj.containsKey("gameName")) {

				gameName = obj.get("gameName").toString();
			}

			if (obj.containsKey("gameName")) {

				gameName = obj.get("gameName").toString();
			}
			if (obj.containsKey("gameName")) {

				gameName = obj.get("gameName").toString();
			}

			String gameN = obj.get("gameName").toString();
			String gameName = obj.get("gameName").toString();

			obj = (JSONObject) obj.get("sprite");
			GameActions gameAction = null;

			width = Integer.parseInt(obj.get("width").toString());
			height = Integer.parseInt(obj.get("height").toString());
			imagePath = obj.get("imagePath").toString();
			if (null != obj.get("gameAction")) {
				gameAction = GameActions.valueOf(obj.get("gameAction").toString());
			}

			if (null != spriteName && spriteName.equalsIgnoreCase("Ball")) {

				sprite = new Ball(0, 0, width, height, imagePath);

			} else if (null != spriteName && spriteName.equalsIgnoreCase("Paddle")) {

				sprite = new Paddle(0, 0, width, height, imagePath);

			} else if (null != spriteName && spriteName.equalsIgnoreCase("Brick")) {

				sprite = new Brick(0, 0, width, height, imagePath);

			}

			if (null != gameAction && null != sprite) {

				sprite.setGameAction(gameAction);
			}

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
*/
		return sprite;
	}
}
