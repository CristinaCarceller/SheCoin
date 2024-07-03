import { Router } from "express";
import AuthController from "../controllers/Auth.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class AuthRoutes {
	#controller;
	#router;
	#authMiddleware;

	constructor() {
		this.#router = Router();
		this.#controller = new AuthController();
		this.#authMiddleware = new AuthMiddleware();
		this.initialiseRoutes();
	}

	initialiseRoutes = () => {
		this.#router.post("/login", this.#controller.login);
	};

	getRouter = () => {
		return this.#router;
	};
}
