const ui = new UI();
const geocord = new GEOCORD();
let orders, prices;
const placeOrderForm = document.querySelector('#submitForm');
const btnPayment = document.querySelector('#btnPayment');
// const pay = new PAYAUTH();

function eventList() {
	//default loading
	// document.addEventListener('DOMContentLoaded', loader);

	//trigger the button
	placeOrderForm.addEventListener('click', placeOrder);

	//trigger payment button
	btnPayment.addEventListener('click', viewPayment);
}

eventList();

// async function loader() {
// 	await axios.get('https://nigerian-states-info.herokuapp.com/api/v1/states').then((res) => {
// 		const states = res.data.data;
// 		const select = document.querySelectorAll('select');
// 		// return console.log(select);
// 		select.forEach((tag) => {
// 			states.forEach((state) => {
// 				const option = document.createElement('option');
// 				option.value = state.Name.toUpperCase();
// 				option.innerHTML = state.Name.toUpperCase();

// 				//appending the options
// 				tag.appendChild(option);
// 			});
// 		});
// 	});
// }

async function placeOrder(e) {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const parcel_name = document.querySelector('#parcel_name').value;
	const weight = document.querySelector('#weight').value;
	const phone_number = document.querySelector('#phone_number').value;
	const address = document.querySelector('#s_l_address').value;
	const location_major = document.querySelector('#s_s_address').value;
	const r_major = document.querySelector('#r_s_address').value;
	const r_name = document.querySelector('#r_name').value;
	const r_email = document.querySelector('#r_email').value;
	const r_address = document.querySelector('#r_l_address').value;
	const r_phone_number = document.querySelector('#r_phone_number').value;

	//run validation before sending the data
	if (
		!name ||
		!phone_number ||
		!address ||
		!r_name ||
		!r_email ||
		!r_address ||
		!r_phone_number ||
		!weight ||
		!parcel_name ||
		!r_major ||
		!location_major
	) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		placeOrderForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;

		//geting cordinates of the location and destination
		const sender_loc = `${location_major} ${address}`;
		const reciver_loc = ` ${r_major} ${r_address}`;
		const location_cordinates = await geocord.getLocationCord(sender_loc);
		const destination_cordinates = await geocord.getLocationCord(reciver_loc);
		// return console.log(location_cordinates);
		const loc_cord = location_cordinates.cordds.features[0].center;
		const des_cor = destination_cordinates.cordds.features[0].center;

		//calculate travel distance
		const distance = await geocord.calculateDistance(loc_cord, des_cor);

		//calculate price
		const price = await geocord.calculatePrice(distance, weight);

		//get user details
		const userDetails = {
			location_cordinates: loc_cord,
			destination_cordinates: des_cor,
			sender_name: name,
			recipient_name: r_name,
			recipient_email: r_email,
			parcel_name: parcel_name,
			weight: weight,
			location_address: address,
			location_state: location_major,
			destination_address: r_address,
			destination_state: r_major,
			sender_phone_number: phone_number,
			recipient_phone_number: r_phone_number,
			status: 'Pending',
			travel_distance: Math.floor(distance)
		};

		// return console.log(userDetails);

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		});

		return swalWithBootstrapButtons
			.fire({
				title: 'Woow!!!!!',
				text: `Distance Calculated is ${userDetails.travel_distance} km and the price is ${price}`,
				imageUrl: 'https://unsplash.it/700/200',
				imageWidth: 700,
				imageHeight: 200,
				showCancelButton: true,
				confirmButtonText: 'Yes, Proceed Order!',
				cancelButtonText: 'No, cancel!',
				reverseButtons: true
			})
			.then(async (result) => {
				if (result.value) {
					// send the api
					await fetch('https://senditappkh.herokuapp.com/api/v1/create/order', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
						},
						body: JSON.stringify(userDetails)
					})
						.then((res) => {
							return res.json();
						})
						.then(function(data) {
							// make the payment button to show
							placeOrderForm.style.display = 'none';
							btnPayment.style.display = 'block';

							//initialise the payAuth class
							orders = data;
							prices = price;

							return;
						})
						.catch(function(error) {
							//print error
							console.log(error.message);
							ui.printMessage(error.message, 'alert-danger');
						});

					// show paymet display and button
					swalWithBootstrapButtons.fire('Completed!', 'Your Order is Confirmed.', 'success');
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire('Cancelled', 'Your Order is Cancelled :)', 'error');
				}
			});
	}
}

async function viewPayment(e) {
	e.preventDefault();
	//getting the order

	const order = orders.NewOrder;

	const table = document.querySelector('tbody');
	const tr = document.createElement('tr');
	const Amount = document.querySelector('.Amount');

	tr.innerHTML = `
		<td>${order.parcel_name}</td>
		<td>1</td>  
		<th>${order.location_state}</th>
		<td>${order.destination_state}</td>
		<td>${order.weight}</td>
	`;

	table.appendChild(tr);

	Amount.innerHTML = `${prices}`;
}
