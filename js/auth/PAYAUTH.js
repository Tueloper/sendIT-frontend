class PAYAUTH {
	async getPayUser() {
		try {
			const user = await fetch('https://senditappkh.herokuapp.com/api/v1/me', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
				}
			});

			const owner = await user.json();

			return {
				owner
			};
		} catch (error) {
			console.log(`error has happened ${error.message}`);
		}
	}

	async confirmPayemnt(priceObj) {
		try {
			const order = await fetch('https://senditappkh.herokuapp.com/api/v1/order/price', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
				},
				body: JSON.stringify(priceObj)
			});

			const priceOrder = order.json();

			return {
				priceObj
			};
		} catch (err) {
			return console.log(err.message);
		}
	}

	async deleteOrder(id) {
		try {
			const deleteOrder = await fetch(`https://senditappkh.herokuapp.com/api/v1/delete/order/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
				}
			});

			await deleteOrder.json();

			return (window.location.href = '/place-order.html');
		} catch (error) {
			return console.log(error.message);
		}
	}
}
