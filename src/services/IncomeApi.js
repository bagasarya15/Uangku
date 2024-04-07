import axios from "axios";

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiGetIncome(values) {
	try {
		let url = `${webserviceurlMain}/income/get-income`;

		const response = await axios({
			method: "post",
			url: url,
			data: values,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Get Income Error:", error);
		throw error;
	}
}

export async function apiCreateIncome(values) {
	try {
		let url = `${webserviceurlMain}/income`;

		const response = await axios({
			method: "post",
			url: url,
			data: values,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Create Income Error:", error);
		throw error;
	}
}

export async function apiUpdateIncome(values) {
	try {
		let url = `${webserviceurlMain}/income`;

		const response = await axios({
			method: "put",
			url: url,
			data: values,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Update Income Error:", error);
		throw error;
	}
}

export async function apiDeleteIncome(values) {
	try {
		let url = `${webserviceurlMain}/income/${values}`;
		const response = await axios({
			method: "delete",
			url: url,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Delete Category Error:", error);
		throw error;
	}
}
