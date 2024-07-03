import jwt from "jsonwebtoken";

export default class AuthMiddleware {
	verify = (req, res, next) => {
		let token = req.headers["x-access-token"];
		if (!token) return res.status(403).json({ message: "Missing token" });

		jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				return res.status(401).send({ message: "Unauthorised access" });
			} else {
				req.id = decoded.id;
				next();
			}
		});
	};

	softVerify = (req, res, next) => {
		let token = req.headers["x-access-token"];
		if (!token) {
			next();
			return;
		}

		jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				return res.status(401).send({ message: "Unauthorised access" });
			} else {
				req.id = decoded.id;
				next();
			}
		});
	};
}
