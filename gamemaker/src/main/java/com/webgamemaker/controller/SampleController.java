package com.webgamemaker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SampleController {

	@RequestMapping("/welcome")
	public ModelAndView testSpring() {

		return new ModelAndView("welcome", "test", "Test Spring");
	}
}
