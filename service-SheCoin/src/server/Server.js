import cors from "cors";
import express from "express";

export default class Server {
	#app;
	#port;
	#host;
	#server;
	#routers;

	constructor(port, host, routers) {
		this.#app = express();
		this.#port = port;
		this.#host = host;
		this.#server = null;
		this.#routers = routers;
	}

	getApp = () => {
		return this.#app;
	};

	start = () => {
		this.#app.use(cors());
		this.#app.use(express.json());
		this.#app.use((req, res, next) => {
			res.header(
				"Access-Control-Allow-Headers",
				"X-Access-Token, Origin, Content-Type, Accept"
			);
			next();
		});
		this.#routers.forEach((router) => {
			this.#app.use(router.getRouter());
		});

		this.#server = this.#app.listen(this.#port, this.#host, "0.0.0.0", () => {
			console.log(
				`Server is running on http://${this.#server.address().address}:${
					this.#server.address().port
				}`
			);
		});
	};

	close = () => {
		this.#server?.close();
	};
}
