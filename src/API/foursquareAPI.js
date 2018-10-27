
//Forrest Walker walkthrough
class helper {
	static baseURL() {
		return "GET https://api.foursquare.com/v2";
	}

	static auth(){
		const keys = {
			client_ID:"52WWWVIBTJFWH34X3CEPOFOO5420AZWISHUPMSDQIITR5Y3B",
			client_Secret:"BHSSTVQJDWVVIIWMN3BMAOLZ0SSBMILOFPG1RCBAVVJUKFDK",
			version:"20181023"
		};
		return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
	} 

	static urlBuilder(urlPrams) {
		if(!urlPrams) {
			return ""
		}
		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`).join("&");		

	}

	static headers() {
		return {
			accept:"application/json"
		};
	}

	static simpleFetch(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: helper.headers()
		};

		return fetch(
			`${helper.baseURL()}${endPoint}?${helper.auth()}&${helper.urlBuilder(
			urlPrams
			)}`,
			requestData
		).then(res => res.text());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return helper.simpleFetch("/venues/search", "GET", urlPrams);
	}

	static getVenueDetails(VENUE_ID) {
		return helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}

	static getVenuePhotos(VENUE_ID) {
		return helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");

	}
}