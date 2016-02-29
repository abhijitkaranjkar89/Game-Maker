
<%@include file="/jsp/home.jsp"%>
<body>

	<div class="wrap">

		<c:if test="${not empty error}">
			<h3 align="center">
				<font color="RED"> Incorrect Username or Password! </font>
			</h3>
		</c:if>
		<div class="avatar">
			<img src="resources/Treetog-I-Games.ico">
		</div>
		<form action="${pageContext.request.contextPath}/login.do" method="post">
			<input type="text" name="username" placeholder="username" required>
			<div class="bar">
				<i></i>
			</div>
			<input type="password" name="password" placeholder="password"
				required> <a href="" class="forgot_link">Forgot ?</a>
			<button type="submit">Sign in</button>
		</form>
		<br> <a href="">New User? Create Account</a>
	</div>


</body>
</html>
