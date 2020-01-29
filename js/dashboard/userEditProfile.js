//instantiate the class UI
const ui = new UI();

const editProfileForm = document.querySelector('#submitForm');

function eventList() {
	//trigger the button
	editProfileForm.addEventListener('click', editProfile);
}

eventList();

async function editProfile(e) {
	e.preventDefault();
	const full_name = document.querySelector('#first_name').value;
	const phone = document.querySelector('#phone').value;
	const address = document.querySelector('#location').value;
	const email = document.querySelector('#email').value;

	if (!full_name || !address || !phone || !email) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		editProfileForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;

		//get user details
		const userDetails = {
			full_name: full_name,
			phone: phone,
			address: address,
			email: email
		};

		// return console.log(userDetails)
		//send through the api

		await fetch('https://senditappkh.herokuapp.com/api/v1/update/user', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
			},
			body: JSON.stringify(userDetails)
		})
			.then(function(response) {
				return response.json();
			})
			.then(async function(data) {
				await Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Your Profile Is Updated',
					showConfirmButton: false,
					timer: 1500
				});
				console.log(data);
				editProfileForm.innerHTML = `Save`;
				return window.location.reload();
			})
			.catch(function(error) {
				console.log(error.message);
				ui.printMessage(error.message, 'alert-danger');
			});
	}
}
// }
