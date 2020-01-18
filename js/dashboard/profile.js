// const ui = new UI();

async function viewProfile() {
	console.log('instructed');
	await fetch('https://senditappkh.herokuapp.com/api/v1/me', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
		}
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			document.getElementById('img_top').src = data.image_url;
			document.getElementById('first_name').value = data.full_name;
			document.getElementById('phone').value = data.phone;
			document.getElementById('email').value = data.email;
			document.getElementById('location').value = data.address;
			document.getElementById('img_top').src = data.image_url;
			document.getElementById('img_id').src = data.image_url;
			// window.location.href = "/index.html";
		})
		.catch(function(error) {
			console.log(`error has happened ${error.message}`);
			// ui.printMessage(error.message, "alert-danger");
		});
}

viewProfile();
