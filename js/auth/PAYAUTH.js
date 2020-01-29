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
}
