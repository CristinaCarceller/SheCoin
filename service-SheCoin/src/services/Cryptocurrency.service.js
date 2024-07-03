import axios from "axios";
import Config from "../configuration/Config.js";

export default class CryptoService {
	getCryptocurrency = async () => {
		const response = await axios.get(
			"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
			{
				headers: {
					"X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY,
				},
			}
		);

		return response.data;
	};

	formatCryptocurrencies = ({ watchlist, coins }) => {
		return coins.map((coin) => {
			if (watchlist.includes(coin.id)) {
				return {
					...coin,
					inWatchlist: true,
				};
			} else {
				return {
					...coin,
					inWatchlist: false,
				};
			}
		});
	};

	getCryptocurrencyById = async (coinId) => {
		try {
			const data = await this.getCryptocurrency();

			const coin = data.data.find((data) => data.id === Number(coinId));

			return coin;
		} catch (error) {
			console.log("Error fetching crypto data");
		}
	};
}
