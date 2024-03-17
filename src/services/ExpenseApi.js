import axios from "axios";

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiGetExpense(values) {
	try {
		let url = `${webserviceurlMain}/expense/get-expense`;

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
		console.error("API Get Expense Error:", error);
		throw error;
	}
}

export async function apiCreateExpense(values) {
	try {
		let url = `${webserviceurlMain}/expense`;

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
		console.error("API Create Expense Error:", error);
		throw error;
	}
}

export async function apiUpdateExpense(values) {
	try {
		let url = `${webserviceurlMain}/expense`;

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
		console.error("API Update Expense Error:", error);
		throw error;
	}
}

export async function apiDeleteExpense(values) {
	try {
		let url = `${webserviceurlMain}/expense/${values}`;
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
