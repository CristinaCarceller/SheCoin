import { assert, expect } from "chai";
import bcrypt from "bcrypt";
import Sinon from "sinon";
import User from "../src/models/User.model.js";
import AuthService from "../src/services/Auth.service.js";
import Config from "../src/configuration/Config.js";
import testUserData from "./testData.js";

describe("Auth Service", () => {
	let authService;
	let userFindStub;
	let testUser1;
	const { testUsers } = testUserData;

	before(() => {
		Config.load();
	});

	beforeEach(async () => {
		authService = new AuthService();
		const hashedPassword = await bcrypt.hash(testUsers[0].password, 10);
		testUser1 = new User({
			email: testUsers[0].email,
			password: hashedPassword,
		});
		userFindStub = Sinon.stub(User, "findOne").resolves(testUser1);
	});

	afterEach(() => {
		userFindStub.restore();
	});

	describe("Login Test", () => {
		it("should return a user object with a token when given a valid email and password", async () => {
			const login = await authService.login({
				email: testUser1.email,
				password: testUsers[0].password,
			});
			expect(login).to.have.property("accessToken");
			expect(login).to.have.property("id");
		});

		it("should throw an error when given an invalid email", async () => {
			try {
				await authService.login({
					email: "",
					password: "password",
				});
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Invalid details");
			}
		});
		it("should throw an error when given an invalid password", async () => {
			try {
				await authService.login({
					email: testUsers[0].email,
					password: "badPassword",
				});
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Invalid details");
			}
		});
	});
});
