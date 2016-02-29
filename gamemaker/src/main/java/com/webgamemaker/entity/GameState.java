package com.webgamemaker.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GameState {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id ;
	
	@Column
	private String dateTimeStamp;
	
	@Column
	private int userId;
	
	@Column
	private String jsonState;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDateTimeStamp() {
		return dateTimeStamp;
	}

	public void setDateTimeStamp(String dateTimeStamp) {
		this.dateTimeStamp = dateTimeStamp;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getJsonState() {
		return jsonState;
	}

	public void setJsonState(String jsonState) {
		this.jsonState = jsonState;
	}
	
	
}
