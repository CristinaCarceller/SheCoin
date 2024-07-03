import CryptoService from "../services/Cryptocurrency.service.js";
import UserService from "../services/User.service.js";

export default class CryptocurrencyController {
	#cryptoService;
	#userService;

	constructor() {
		this.#cryptoService = new CryptoService();
		this.#userService = new UserService();
	}

	getCryptocurrency = async (req, res) => {
		try {
			const userId = req.id;
			let watchlist = [];

			if (userId) {
				const user = await this.#userService.getUserById(userId);
				watchlist = user.watchlist;
			}

			// get current users favourites list from db
			const coins = await this.#cryptoService.getCryptocurrency();

			const formattedCoins = this.#cryptoService.formatCryptocurrencies({
				watchlist,
				coins: coins.data,
			});

			return res.status(200).send({ coins: formattedCoins });
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: "Something went wrong" });
		}
	};

	getCryptocurrencyById = async (req, res) => {
		try {
			const { coinId } = req.params; //Extract id from parameters

			if (!coinId) {
				return res.status(400).send({ message: "Id not defined" });
			}

			const data = await this.#cryptoService.getCryptocurrencyById(coinId);

			if (!data) {
				return res.status(404).send({ message: "Coin not found" });
			}
			return res.status(200).send({ coin: data });
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: "Something went wrong" });
		}
	};
}
