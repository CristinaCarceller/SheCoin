import axios from "axios";

const API_URL = import.meta.env.VITE_APP_USER_URL;

export const getWatchlist = async () => {
	try {
		const token = localStorage.getItem("accessToken");

		const response = await axios.get(`${API_URL}/watchlist`, {
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
export const addToWatchlist = async (coinId) => {
	try {
		const token = localStorage.getItem("accessToken");

		const response = await axios.post(
			`${API_URL}/watchlist/add`,
			{
				coinId,
			},
			{
				headers: {
					"X-Access-Token": token,
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const removeFromWatchlist = async (coinId) => {
	try {
		const token = localStorage.getItem("accessToken");

		const response = await axios.post(
			`${API_URL}/watchlist/delete`,
			{
				coinId,
			},
			{
				headers: {
					"X-Access-Token": token,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};
