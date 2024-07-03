import CryptoService from "../services/Cryptocurrency.service.js";
import UserService from "../services/User.service.js";
import WatchlistService from "../services/Watchlist.service.js";

export default class WatchlistController {
	#cryptoService;
	#userService;
	#watchlistService;

	constructor() {
		this.#cryptoService = new CryptoService();
		this.#userService = new UserService();
		this.#watchlistService = new WatchlistService();
	}

	getWatchlist = async (req, res) => {
		try {
			const userId = req.id;

			const user = await this.#userService.getUserById(userId);
			const watchlist = user.watchlist;

			//current users favourites list from db
			const coins = await this.#cryptoService.getCryptocurrency();

			const formattedCoins = this.#cryptoService.formatCryptocurrencies({
				watchlist,
				coins: coins.data,
			});

			const watchlistCoins = formattedCoins.filter((coin) => coin.inWatchlist);

			return res.status(200).send({ coins: watchlistCoins });
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: "Something went wrong" });
		}
	};

	addToWatchlist = async (req, res) => {
		try {
			const userId = req.id;
			const coinId = req.body.coinId;

			if (!userId || !coinId) {
				res
					.status(400)
					.send({ message: "missing required fields", success: false });
				return;
			}

			const user = await this.#userService.getUserById(userId);
			if (!user) {
				res.status(400).send({ message: "User not found", success: false });
				return;
			}

			this.#watchlistService.addCoinId({ user, coinId });

			res.status(200).send({
				message: `Add to favourites`,
				success: true,
			});
		} catch (error) {
			res.status(400).send({
				message: "Unable to add to watchlist",
				user: null,
			});
		}
	};

	deleteFromWatchlist = async (req, res) => {
		try {
			const userId = req.id;
			const { coinId } = req.body;

			if (!userId || !coinId) {
				res
					.status(400)
					.send({ message: "missing required fields", success: false });
				return;
			}

			const user = await this.#userService.getUserById(userId);
			console.log({ user });
			if (!user) {
				res.status(400).send({ message: "User not found", success: false });
				return;
			}

			this.#watchlistService.removeCoinId({ user, coinId });

			res.status(200).send({
				message: `Deleted from watchlist`,
				success: true,
			});
		} catch (error) {
			res.status(400).send({
				message: "Unable to delete from watchlist",
				user: null,
			});
		}
	};
}
