import axios from "axios";

const API_URL = import.meta.env.VITE_APP_USER_URL;

export const getCryptocurrencies = async () => {
	try {
		const token = localStorage.getItem("accessToken");

		const response = await axios.get(`${API_URL}/cryptocurrency`, {
			headers: {
				"X-Access-Token": token,
			},
		});

		return response.data;
	} catch (error) {
		console.log(
			"Error:",
			error.response ? error.response.data.message : error.message
		);
	}
};

export const getCryptocurrencyById = async (coinId) => {
	try {
		if (!coinId) {
			console.log("Coin ID is required");
		}
		const response = await axios.get(`${API_URL}/cryptocurrency/${coinId}`);

		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};
