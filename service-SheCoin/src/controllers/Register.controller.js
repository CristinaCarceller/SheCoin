import RegisterService from "../services/Register.service.js";

export default class RegisterController {
	#registerService;

	constructor() {
		this.#registerService = new RegisterService();
	}

	register = async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await this.#registerService.register({ email, password });
			res
				.header("X-Access-Token", user.accessToken)
				.status(200)
				.send({ message: `Registration successful`, user });
		} catch (error) {
			res.status(400).send({ message: error.message, user: null });
		}
	};
}
