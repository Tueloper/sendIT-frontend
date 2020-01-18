//instantiate the class UI
const ui = new UI();
const loginForm = document.querySelector('#buttonClick');
function eventList() {
	//trigger the button
	loginForm.addEventListener('click', LoginUser);
}

eventList();

async function LoginUser(e) {
	e.preventDefault();

	const email = document.querySelector('#loginEmail').value;
	const password = document.querySelector('#loginPassword').value;
	loginForm.innerHTML = `
	<span class="spinner-border spinner-border-sm"></span> Processing
`;

	const userDetails = {
		email: email,
		password: password
	};

	await fetch('https://senditappkh.herokuapp.com/api/v1/login', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userDetails)
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			loginForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;
			const token = data.token;
			sessionStorage.setItem('user_jwt', token);

			return (window.location.href = './dashboard.html');
		})
		.catch(function(error) {
			console.log(error.message);
		});
}
