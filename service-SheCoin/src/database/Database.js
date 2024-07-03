import mongoose from "mongoose";

export default class Database {
	#uri;

	constructor(uri) {
		this.#uri = uri;
	}

	connect = async () => {
		try {
			await mongoose.connect(this.#uri);
			return console.log(`Connected to database @ ${this.#uri}`);
		} catch (error) {
			console.log(`Error connecting`, error);
		}
	};

	disconnect = async () => {
		await mongoose.disconnect();
	};
}
