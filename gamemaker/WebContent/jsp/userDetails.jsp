<c:if test="${not empty sessionScope.username}">
		<h3 align="left">
			<font color="BLACK">Welcome ${sessionScope.username}!</font>
		</h3>
	</c:if>

	<h3 align="Right">
		<font color="BLACK"><a href="">Logout</a> </font>
	</h3>
	<br>
	<hr>
