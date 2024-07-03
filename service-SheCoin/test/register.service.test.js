import { assert, expect } from "chai";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Sinon from "sinon";
import User from "../src/models/User.model.js";
import RegisterService from "../src/services/Register.service.js";
import Config from "../src/configuration/Config.js";
import testUserData from "./testData.js";

describe("Register Service", () => {
	let registerService;
	let userFindStub;
	let userSaveStub;
	let bcryptHashStub;
	let jwtSignStub;

	const { testUsers } = testUserData;

	before(() => {
		Config.load();
	});

	beforeEach(async () => {
		registerService = new RegisterService();
		userFindStub = Sinon.stub(User, "findOne");
		userSaveStub = Sinon.stub(User.prototype, "save");
		bcryptHashStub = Sinon.stub(bcrypt, "hash");
		jwtSignStub = Sinon.stub(jwt, "sign");
	});

	afterEach(() => {
		userFindStub.restore();
		userSaveStub.restore();
		bcryptHashStub.restore();
		jwtSignStub.restore();
	});

	describe("Register Test", () => {
		it("should add a new user and return a user object with a token when given a valid email and password", async () => {
			userFindStub.resolves(null);
			bcryptHashStub.resolves("hashedPassword");
			userSaveStub.resolves();
			jwtSignStub.returns("testToken");

			const register = await registerService.register({
				email: testUsers[0].email,
				password: testUsers[0].password,
			});
			expect(register).to.have.property("accessToken", "testToken");
			expect(register).to.have.property("id");
		});

		it("should throw an error when the user already exists", async () => {
			userFindStub.resolves(testUsers[0]);
			try {
				await registerService.register({
					email: testUsers[0].email,
					password: testUsers[0].password,
				});
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Registration failed");
			}
		});
		it("should throw an error if save function fails", async () => {
			userFindStub.resolves(null);
			bcryptHashStub.resolves("hashedPassword");
			userSaveStub.rejects(new Error("Save user fail"));
			try {
				await registerService.register({
					email: testUsers[0].email,
					password: testUsers[0].password,
				});
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Registration failed");
			}
		});
	});
});
