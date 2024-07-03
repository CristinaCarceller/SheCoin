import { expect } from "chai";
import supertest from "supertest";
import RegisterService from "../src/services/Register.service.js";
import RegisterController from "../src/controllers/Register.controller.js";
import RegisterRoutes from "../src/routes/Register.route.js";
import Server from "../src/server/Server.js";
import Database from "../src/database/Database.js";
import User from "../src/models/User.model.js";
import Config from "../src/configuration/Config.js";
import testData from "./testData.js";

const { testUsers } = testData;

describe("RegisterController Integration Tests:", () => {
	let server;
	let database;
	let request;
	let registerController;

	before(async () => {
		Config.load();
		const { PORT, HOST, DB_URI } = process.env;
		const registerService = new RegisterService();
		registerController = new RegisterController(registerService);
		const registerRoutes = new RegisterRoutes(registerController);
		database = new Database(DB_URI);
		server = new Server(PORT, HOST, [registerRoutes]);
		server.start();
		await database.connect();
		request = supertest(server.getApp());
	});

	after(async () => {
		await server.close();
		await database.disconnect();
	});

	beforeEach(async () => {
		await User.deleteMany();
	});

	describe("POST request to /register", () => {
		it("should respond with 200 status code if registration details are valid", async () => {
			const response = await request.post("/register").send(testUsers[0]);

			expect(response.status).to.equal(200);
			expect(response.headers).to.have.property("x-access-token");
			expect(response.body).to.have.property(
				"message",
				"Registration successful"
			);
		});

		it("should respond with 400 status code if user already exists", async () => {
			await request.post("/register").send(testUsers[0]);
			const response = await request.post("/register").send(testUsers[0]);

			expect(response.status).to.equal(400);
			expect(response.body).to.have.property("message", "Registration failed");
		});
	});
});
