function Auth(req, res, next) {
	const token = sessionStorage.getItem('user_jwt');
	// console.log(token);

	if (!token) {
		window.location.href = './login.html';
	}
}
Auth();

function logout() {
	try {
		sessionStorage.removeItem('user_jwt');
		window.location.href = './index.html';
	} catch (e) {
		console.log(e.message);
		alert('User already logged out');
	}
}
