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

export async function apiFilterExpenseByCategory(params) {
	try {
		const response = await axios({
			method: "post",
			data: params,
			url: webserviceurlMain + "/dashboard/expense-with-category",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Dashboard Expense Error:", error);
		throw error;
	}
}
