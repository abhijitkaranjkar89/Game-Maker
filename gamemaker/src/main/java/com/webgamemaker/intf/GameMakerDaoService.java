package com.webgamemaker.intf;

import java.util.List;

import com.webgamemaker.entity.Game;
import com.webgamemaker.entity.User;

public interface GameMakerDaoService {

	User authenticateUser(String username, String password);
	public Game retrieveGame(int id);
	public Game persistGame(Game game);
	public void updateGame(Game game);
	public List<Game> retrieveAllGames();
}
