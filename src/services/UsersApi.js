import axios from "axios";

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiGetUsers(params) {
	try {
		const { page, limit, search } = params;
		let url = `${webserviceurlMain}/users/${page}/${limit}`;

		if (search) {
			url += `/${search}`;
		}

		const response = await axios.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Get Users Error:", error);
		throw error;
	}
}
