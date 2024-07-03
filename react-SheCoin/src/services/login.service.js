import axios from "axios";

const API_URL = import.meta.env.VITE_APP_USER_URL;

export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/login`, {
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
			message: "Login unsuccessful",
			user: null,
		};
	}
};
