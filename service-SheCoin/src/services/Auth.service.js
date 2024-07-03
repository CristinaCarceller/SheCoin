import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export default class AuthService {
	login = async ({ email, password }) => {
		const user = await User.findOne({ email: email });

		if (!user) {
			throw new Error("Invalid details");
		}
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: 86400,
			});

			return { accessToken: token, id: user._id };
		} else {
			throw new Error("Invalid details");
		}
	};
}
