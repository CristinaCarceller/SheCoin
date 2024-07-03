import axios from "axios";

const API_URL = import.meta.env.VITE_APP_USER_URL;

export const register = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/register`, {
			email,
			password,
		});

		return response.data;
	} catch (error) {
		if (error.response.data.message) {
			return {
				message: error.response.data.message,
				user: null,
			};
		}

		return {
			message: "Something went wrong",
			user: null,
		};
	}
};
