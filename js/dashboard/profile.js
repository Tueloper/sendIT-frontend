const pay = new PAYAUTH();

async function viewProfile() {
	// console.log(());
	const user = await pay.getPayUser();
	const data = user.owner;

	document.getElementById('img_top').src = data.image_url;
	const userName = document.getElementById('userName');
	userName.innerHTML = `Welcome!!!...   ${data.full_name}`;
	const URL = document.URL;

	if (window.location.href.indexOf('place-order') > -1) {
		const nameey = document.getElementById('nameey');
		const p = document.createElement('p');
		p.innerHTML = data.full_name;
		nameey.appendChild(p);
	}

	document.getElementById('first_name').value = data.full_name;
	document.getElementById('img_top').src = data.image_url;
	document.getElementById('phone').value = data.phone;
	document.getElementById('email').value = data.email;
	document.getElementById('location').value = data.address;
	document.getElementById('img_id').src = data.image_url;
}

viewProfile();
