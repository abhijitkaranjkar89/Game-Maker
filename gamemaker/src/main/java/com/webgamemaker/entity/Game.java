package com.webgamemaker.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity(name = "game")
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id;

	@Column
	private String gameName;

	@Column
	private int backgroundSpriteId;

	@Column
	private int userid;

	@Lob
	@Column(columnDefinition = "BLOB")
	private byte[] jsonGameConfig;

	public int getId() {
		return id;
	}

	private List<Sprite> sprites;

	public void setId(int id) {
		this.id = id;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

	public int getBackgroundSpriteId() {
		return backgroundSpriteId;
	}

	public void setBackgroundSpriteId(int backgroundSpriteId) {
		this.backgroundSpriteId = backgroundSpriteId;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public byte[] getJsonGameConfig() {
		return jsonGameConfig;
	}

	public void setJsonGameConfig(byte[] jsonGameConfig) {
		this.jsonGameConfig = jsonGameConfig;
	}

}
