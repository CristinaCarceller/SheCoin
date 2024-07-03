import AuthService from "../services/Auth.service.js";

export default class AuthController {
	#authService;

	constructor(authService = new AuthService()) {
		this.#authService = authService;
	}
	login = async (req, res) => {
		try {
			const user = await this.#authService.login(req.body);

			res.header("X-Access-Token", user.accessToken).status(200).send(user);

			return user;
		} catch (error) {
			res.status(401).send({ error: error.message });
		}
	};
}
