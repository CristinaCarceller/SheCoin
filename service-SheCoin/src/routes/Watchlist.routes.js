import { Router } from "express";
import WatchlistController from "../controllers/Watchlist.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class WatchlistRoutes {
	#controller;
	#router;
	#authMiddleware;

	constructor() {
		this.#router = Router();
		this.#controller = new WatchlistController();
		this.#authMiddleware = new AuthMiddleware();
		this.initialiseRoutes();
	}

	initialiseRoutes = () => {
		this.#router.post(
			"/watchlist/add",
			this.#authMiddleware.verify,
			this.#controller.addToWatchlist
		);
		this.#router.post(
			"/watchlist/delete",
			this.#authMiddleware.verify,
			this.#controller.deleteFromWatchlist
		);
		this.#router.get(
			"/watchlist",
			this.#authMiddleware.verify,
			this.#controller.getWatchlist
		);
	};

	getRouter = () => {
		return this.#router;
	};
}
