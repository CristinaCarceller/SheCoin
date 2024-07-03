import { Router } from "express";
import CryptocurrencyController from "../controllers/Cryptocurrency.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class CryptoRoutes {
	#controller;
	#router;
	#authMiddleware;

	constructor() {
		this.#router = new Router();
		this.#controller = new CryptocurrencyController();
		this.#authMiddleware = new AuthMiddleware();
		this.initialiseRoutes();
	}

	initialiseRoutes = () => {
		this.#router.get(
			"/cryptocurrency/:coinId",
			this.#controller.getCryptocurrencyById
		);
		this.#router.get(
			"/cryptocurrency",
			this.#authMiddleware.softVerify,
			this.#controller.getCryptocurrency
		);
	};

	getRouter = () => {
		return this.#router;
	};
}
