import axios from "axios";

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

export async function isAuthorized(values) {
  try {
    let url = webserviceurlMain + "/auth/authorize";
    
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
    console.error("API Get Authorized Error:", error);
    throw error;
  }
}

export async function editProfile(params) {
	try {
		const response = await axios({
			method: "put",
			data: params,
			url: webserviceurlMain + "/users",
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Edit Profile Error:", error);
		throw error;
	}
}

export async function activatedAccount(params) {
	try {
		console.log(params, 'sampe ga')
		const response = await axios({
			method: "put",
			data: params,
			url: webserviceurlMain + "/auth/aktivasi",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Aktivasi Profile Error:", error);
		throw error;
	}
}

export async function deleteImage(params) {
	try {
		const response = await axios({
			method: "put",
			data: params,
			url: webserviceurlMain + "/users/delete-image",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("API Delete Image Error:", error);
		throw error;
	}
}
