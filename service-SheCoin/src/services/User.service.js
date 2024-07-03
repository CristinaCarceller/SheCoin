import User from "../models/User.model.js";

export default class UserService {
	getUserById = async (userId) => {
		const user = await User.findById(userId);

		if (!user) {
			return undefined;
		}

		return user;
	};
}
