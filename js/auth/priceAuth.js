const payAuth = new PAYAUTH();

async function AUth() {
	try {
		const order = await payAuth.paymentAuth();

		if (!order) window.location = '/place-order.html';
		else return;
	} catch (error) {
		return console.log(error.message);
	}
}

AUth();
