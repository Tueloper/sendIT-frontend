class GEOCORD {
	async getLocationCord(address) {
		try {
			let url =
				'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
				address +
				'.json?access_token=pk.eyJ1IjoidHVlbG9wZXIiLCJhIjoiY2p1dmhhdnJiMDFtOTRlcXIzam13OW1iayJ9.WZDMLXn5ToFglfiu3NpXmQ';

			const data = await fetch(url);
			const cordds = await data.json();

			return {
				cordds
			};
		} catch (err) {
			return console.log(err.message);
		}
	}

	async calculateDistance(to, from) {
		try {
			const location = turf.point(to);
			const destination = turf.point(from);
			const options = { units: 'kilometers' };

			const distance = await turf.distance(location, destination, options);

			return distance;
		} catch (error) {
			return console.log(error.message);
		}
	}

	async calculatePrice(distance, weight) {
		//convert distance to price

		const meterDistance = parseFloat(distance * weight * 50);

		//flooring values
		const priceV = Math.floor(meterDistance);

		//adding symv=bol
		const price = '₦ ' + priceV;

		return price;
	}
}
