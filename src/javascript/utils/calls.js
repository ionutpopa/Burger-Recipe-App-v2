export const calls = {
	signup: (service, data) => {
		return {
			method: "POST",
			url: `${service}/`,
			data: data,
		};
	},
	login: (service, data) => {
		return {
			method: "POST",
			url: `${service}/`,
			data: data,
		};
	},
	getUser: (service, token, userId) => {
		return {
			method: "GET",
			url: `${service}/${userId}`,
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
		};
	},
	postRecipe: (service, token, data) => {
		return {
			method: "POST",
			url: `${service}/`,
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
			data: data,
		};
	},
	updateRecipe: (service, token, data, userId) => {
		return {
			method: "PUT",
			url: `${service}/${userId}`,
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
			data: data,
		};
	},
	deleteRecipe: (service, token, userId) => {
		return {
			method: "DELETE",
			url: `${service}/${userId}`,
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
		};
	},
	getRecipes: (service) => {
		return {
			method: "GET",
			url: `${service}/`,
		};
	},
	getRecipe: (service, id) => {
		return {
			method: "GET",
			url: `${service}/${id}`,
		};
	},
};
