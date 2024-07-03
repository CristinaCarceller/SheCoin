import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { register } from "../src/services/register.service.js";
import { describe, it, expect, beforeEach } from "vitest";

describe("register service", () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it("should return user data on successful registration", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "password123";
		const responseData = { user: { id: 1, email } };

		mock
			.onPost(`${import.meta.env.VITE_APP_USER_URL}/register`)
			.reply(200, responseData);

		// Act
		const result = await register(email, password);

		// Assert
		expect(result).toEqual(responseData);
	});

	it("should return error message on failed registration with existing email", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "password123";
		const errorResponse = { message: "Email already in use" };

		mock
			.onPost(`${import.meta.env.VITE_APP_USER_URL}/register`)
			.reply(400, errorResponse);

		// Act
		const result = await register(email, password);

		// Assert
		expect(result).toEqual({
			message: "Email already in use",
			user: null,
		});
	});

	it("should handle cases where error response does not have a message field", async () => {
		// Arrange
		const email = "test@example.com";
		const password = "password123";

		mock.onPost(`${import.meta.env.VITE_APP_USER_URL}/register`).reply(400, {});

		// Act
		const result = await register(email, password);

		// Assert
		expect(result).toEqual({
			message: "Something went wrong",
			user: null,
		});
	});
});
