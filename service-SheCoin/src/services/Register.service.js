import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class RegisterService {
	register = async ({ email, password }) => {
		try {
			const existingUser = await User.findOne({ email: email });
			if (existingUser) {
				throw Error("User already exists");
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new User({ email: email, password: hashedPassword });
			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
				expiresIn: 86400,
			});
			return { accessToken: token, id: newUser._id };
		} catch (error) {
			console.error("Error during registration", error.message);
			throw new Error("Registration failed");
		}
	};
}
