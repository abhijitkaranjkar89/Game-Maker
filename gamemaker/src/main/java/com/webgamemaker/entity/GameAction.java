package com.webgamemaker.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GameAction {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id ;
	
	@Column
	private String gameActionName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGameActionName() {
		return gameActionName;
	}

	public void setGameActionName(String gameActionName) {
		this.gameActionName = gameActionName;
	}
	
	
}
