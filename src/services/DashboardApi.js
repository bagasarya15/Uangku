import axios from "axios";

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiDashboard(params) {
	try {
		const response = await axios({
			method: "post",
			data: params,
			url: webserviceurlMain + "/dashboard",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Dashboard Error:", error);
		throw error;
	}
}
