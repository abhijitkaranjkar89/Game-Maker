package com.webgamemaker.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.webgamemaker.entity.User;
import com.webgamemaker.intf.GameMakerDaoService;
import com.webgamemaker.utility.GeneralConstants;

@Controller
public class LoginController {

	@Autowired
	private GameMakerDaoService gameMakerDaoService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)

	public ModelAndView executeLogin(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView model = null;

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		User user = null;
		HttpSession session = null;

		try {

			user = gameMakerDaoService.authenticateUser(username, password);

			if (null != user) {

				System.out.println("User Login Successful");

				session = request.getSession();

				session.setAttribute("userid", user.getId());
				session.setAttribute("username", user.getName());

				if (user.getType().equalsIgnoreCase(GeneralConstants.ADMIN_USER_TYPE)) {

					model = new ModelAndView("gameeditor/adminEditor");

				} else if (user.getType().equalsIgnoreCase(GeneralConstants.ONLY_PLAYER)) {

					model = new ModelAndView("game/gamewindow");
				}

			}

			else {

				model = new ModelAndView("login/login", "error", "Invalid credentials!!");
				/* request.setAttribute("error", "Invalid credentials!!"); */

			}

		}

		catch (Exception e) {

			e.printStackTrace();

		}

		return model;

	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ModelAndView executeLogout(HttpServletRequest request, HttpServletResponse response) {
		

		ModelAndView model = null;		
		HttpSession session = null;

		session = request.getSession();
		
		session.removeAttribute("userid");
		session.removeAttribute("username");
		
		session.invalidate();
		model = new ModelAndView("login/login", "logout", "Logged out successfully!");
		
		return model;
	}

		

}
