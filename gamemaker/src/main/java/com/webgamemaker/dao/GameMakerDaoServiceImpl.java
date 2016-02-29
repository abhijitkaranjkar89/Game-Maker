package com.webgamemaker.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webgamemaker.entity.Game;
import com.webgamemaker.entity.User;
import com.webgamemaker.intf.GameMakerDaoService;

@Repository
@Service
public class GameMakerDaoServiceImpl implements GameMakerDaoService {

	@PersistenceContext(unitName = "gamemakerpersistence")
	private EntityManager em;

	@Override
	public User authenticateUser(String username, String password) {
		// TODO Auto-generated method stub

		String sql = "SELECT * FROM USER WHERE username = ? AND password = ?";
		Query query = em.createNativeQuery(sql, User.class);

		query.setParameter(1, username);
		query.setParameter(2, password);

		List<User> userList = query.getResultList();

		if (null != userList && userList.size() > 0) {
			return userList.get(0);
		}
		return null;
	}

	@Override
	public Game retrieveGame(int id) {
		// TODO Auto-generated method stub

		String sql = "SELECT * FROM GAME WHERE id = ?";
		Query query = em.createNativeQuery(sql, Game.class);

		query.setParameter(1, id);
		List<Game> gameList = query.getResultList();

		if (null != gameList && gameList.size() > 0) {
			return gameList.get(0);
		}
		return null;
	}

	@Override
	@Transactional
	public Game persistGame(Game game) {
		// TODO Auto-generated method stub

		em.persist(game);
		em.flush();

		return game;
	}

	@Override
	public void updateGame(Game game) {
		// TODO Auto-generated method stub

		em.merge(game);
		em.flush();

	}

	@Override
	public List<Game> retrieveAllGames() {
		// TODO Auto-generated method stub

		String sql = "SELECT * FROM GAME";
		Query query = em.createNativeQuery(sql, Game.class);

		List<Game> gameList = query.getResultList();

		return gameList;
	}

}
