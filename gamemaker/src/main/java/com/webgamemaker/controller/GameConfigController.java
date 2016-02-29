package com.webgamemaker.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.webgamemaker.entity.Game;
import com.webgamemaker.intf.GameMakerDaoService;

@Controller
public class GameConfigController {

	@Autowired
	private GameMakerDaoService gameMakerDaoService;

	@RequestMapping(value = "/saveGameConfig", method = RequestMethod.POST)
	public @ResponseBody String executeSaveConfig(HttpServletRequest request, HttpServletResponse response) {

		String jsonGameConfig = request.getParameter("gameConfig");
		String gameName = request.getParameter("gameName");
		String gameId = request.getParameter("gameId");
		Game game = null;
		
		if (null != gameId && !gameId.equals("")) {
			game = gameMakerDaoService.retrieveGame(Integer.parseInt(gameId));

			if (null != jsonGameConfig) {
				game.setJsonGameConfig(jsonGameConfig.getBytes());
				gameMakerDaoService.updateGame(game);
			}

		} else {

			game = new Game();
			game.setGameName(gameName);

			if (null != jsonGameConfig) {
				game.setJsonGameConfig(jsonGameConfig.getBytes());
			}

			game = gameMakerDaoService.persistGame(game);
		}

		if (null != game && game.getId() != 0) {

			return String.valueOf(game.getId());
		}

		return "error";
	}

	@RequestMapping(value = "/retrieveAllConfigs", method = RequestMethod.POST)
	public List<Game> getAllGames(HttpServletRequest request, HttpServletResponse response) {

		List<Game> allGames = gameMakerDaoService.retrieveAllGames();

		return allGames;
	}

	@RequestMapping(value = "/getGameConfig", method = RequestMethod.POST)
	public Game getGameConfig(HttpServletRequest request, HttpServletResponse response) {

		String gameId = request.getParameter("gameId");

		Game game = null;

		if (null != gameId) {
			game = gameMakerDaoService.retrieveGame(Integer.parseInt(gameId));
		}

		return game;
	}

}
