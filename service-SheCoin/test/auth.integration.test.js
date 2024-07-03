import bcrypt from "bcrypt";
import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import AuthService from "../src/services/Auth.service.js";
import AuthController from "../src/controllers/Auth.controller.js";
import AuthRoutes from "../src/routes/Auth.routes.js";
import Database from "../src/database/Database.js";
import Server from "../src/server/Server.js";
import Config from "../src/configuration/Config.js";
import testUserData from "./testData.js";
import User from "../src/models/User.model.js";

const { testUsers } = testUserData;

describe("Integration Tests:", () => {
	let server;
	let database;
	let request;
	let authController;
	let authService;

	before(async () => {
		Config.load();
		const { PORT, HOST, DB_URI } = process.env;
		authService = new AuthService();
		authController = new AuthController(authService);
		const authRoutes = new AuthRoutes(authController);
		database = new Database(DB_URI);
		server = new Server(PORT, HOST, [authRoutes]);
		server.start();
		await database.connect();
		request = supertest(server.getApp());
	});

	after(async () => {
		await server.close();
		await database.disconnect();
	});

	beforeEach(async () => {
		try {
			await User.deleteMany();
			console.log("Database successfully cleared.");

			const hashedPassword0 = bcrypt.hashSync(testUsers[0].password, 10);
			const hashedTestUser0 = { ...testUsers[0], password: hashedPassword0 };
			await User.create(hashedTestUser0);
			console.log("Database successfully added first user");

			const hashedPassword1 = bcrypt.hashSync(testUsers[1].password, 10);
			const hashedTestUser1 = { ...testUsers[1], password: hashedPassword1 };
			await User.create(hashedTestUser1);
			console.log("Database successfully added second user");
		} catch (error) {
			console.log(error.message);
			console.log("Error adding the second user");
			throw new Error();
		}
	});

	describe("POST request to /login on router", () => {
		const { email, password } = testUsers[0];
		const loginUser = { email, password };

		it("should response with 200 status code if login details are correct", async () => {
			const response = await request.post("/login").send(loginUser);

			expect(response.status).to.equal(200);
			expect(response.headers).to.have.property("x-access-token");
			expect(response.body).to.have.property("accessToken");
		});
		it("should response with 401 status code if login details are incorrect", async () => {
			const response = await request
				.post("/login")
				.send({ email: "email", password: "password" });
			expect(response.status).to.equal(401);
		});
	});
});
