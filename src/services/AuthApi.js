import axios from "axios";
// export var webserviceurlMain = "https://api-simka.setkab.go.id";
// export const webservicedir = `${webserviceurlMain}/storage/files`;

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiRegister(params) {
	try {
		const response = await axios({
			method: "post",
			data: params,
			url: webserviceurlMain + "/users",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Register Error:", error);
		throw error;
	}
}

export async function apiLogin(params) {
	try {
		const response = await axios({
			method: "post",
			data: params,
			url: webserviceurlMain + "/auth/login",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Login Error:", error);
		throw error;
	}
}
