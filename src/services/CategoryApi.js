import axios from "axios";

const webserviceurlMain = import.meta.env.VITE_BASE_URL;

export async function apiGetCategory(values) {
	try {
		let url = `${webserviceurlMain}/category/get-category`;

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
		console.error("API Get Category Error:", error);
		throw error;
	}
}

export async function apiCreateCategory(values) {
	try {
		let url = `${webserviceurlMain}/category`;

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
		console.error("API Create Category Error:", error);
		throw error;
	}
}

export async function apiUpdateCategory(values) {
	try {
		let url = `${webserviceurlMain}/category/update`;

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
		console.error("API Update Category Error:", error);
		throw error;
	}
}

export async function apiDeleteCategory(values) {
	try {
		console.log(values, "string");
		let url = `${webserviceurlMain}/category/${values}`;
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
