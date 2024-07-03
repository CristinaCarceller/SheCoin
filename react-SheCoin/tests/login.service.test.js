import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { login } from "../src/services/login.service.js";
import { describe, it, expect, beforeEach } from "vitest";

describe("login service", () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it("should return user data on successful login", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "password123";
		const responseData = { token: "fake-token", user: { id: 1, email } };

		mock
			.onPost(`${import.meta.env.VITE_APP_USER_URL}/login`)
			.reply(200, responseData);

		// Act
		const result = await login(email, password);

		// Assert
		expect(result).toEqual(responseData);
	});

	it("should return error message on failed login with incorrect credentials", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "wrongpassword";
		const errorResponse = { message: "Invalid credentials" };

		mock
			.onPost(`${import.meta.env.VITE_APP_USER_URL}/login`)
			.reply(401, errorResponse);

		// Act
		const result = await login(email, password);

		// Assert
		expect(result).toEqual({
			message: "Invalid credentials",
			user: null,
		});
	});

	it("should handle cases where error response does not have a message field", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "password123";

		mock.onPost(`${import.meta.env.VITE_APP_USER_URL}/login`).reply(400, {});

		// Act
		const result = await login(email, password);

		// Assert
		expect(result).toEqual({
			message: "Login unsuccessful",
			user: null,
		});
	});
});
