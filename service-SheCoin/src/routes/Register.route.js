import { Router } from "express";
import RegisterController from "../controllers/Register.controller.js";

export default class RegisterRoutes {
	#controller;
	#router;

	constructor() {
		this.#router = Router();
		this.#controller = new RegisterController();
		this.initialiseRoutes();
	}
	initialiseRoutes = () => {
		this.#router.post("/register", this.#controller.register);
	};

	getRouter = () => {
		return this.#router;
	};
}
