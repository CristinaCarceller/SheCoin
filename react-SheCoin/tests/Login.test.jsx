import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Login from "../src/components/Login.jsx";
import * as loginService from "../src/services/login.service.js";
import * as registerService from "../src/services/register.service.js";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

vi.mock("../src/services/login.service.js");

const validEmail = "valid@valid.com";
const validPassword = "Password123!";

describe("Login Component", () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should render error message for invalid email format", async () => {
		// Arrange
		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, "invalidEmail");

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, validPassword);

		const signup = screen.getByText("Sign up");
		await userEvent.click(signup);

		// Assert

		await waitFor(() => {
			expect(
				screen.getByText("Please enter a valid email")
			).toBeInTheDocument();
		});
	});

	it("should render error message for invalid password format", async () => {
		// Arrange
		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, "invalid");

		const signup = screen.getByText("Sign up");
		await userEvent.click(signup);

		// Assert
		expect(
			screen.getByText("Please enter a valid password")
		).toBeInTheDocument();
	});

	it("should render error message when password is blank", async () => {
		// Arrange
		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, " ");

		const signup = screen.getByText("Sign up");
		await userEvent.click(signup);

		// Assert
		expect(
			screen.getByText("Please enter a valid password")
		).toBeInTheDocument();
	});

	it("should call register service with valid credentials", async () => {
		// Arrange
		const mockRegisterResponse = {
			user: { id: "user1" },
			accessToken: "token",
		};

		vi.spyOn(registerService, "register").mockResolvedValue(
			mockRegisterResponse
		);

		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, validPassword);

		const signup = screen.getByText("Sign up");
		await userEvent.click(signup);

		// Assert
		await waitFor(() => {
			expect(registerService.register).toHaveBeenCalledWith(
				validEmail,
				validPassword
			);
		});
	});

	it("should not render error message when email and password are valid", async () => {
		// Arrange
		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, validPassword);

		const loginButton = screen.getByRole("button", { name: /login/i });
		await userEvent.click(loginButton);

		// Assert
		expect(
			screen.queryByText("Please enter a valid password")
		).not.toBeInTheDocument();
	});

	it("should call login service with valid credentials", async () => {
		// Arrange
		const mockLoginResponse = { id: "user1", accessToken: "token" };
		vi.spyOn(loginService, "login").mockResolvedValue(mockLoginResponse);

		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, validPassword);

		const loginButton = screen.getByRole("button", { name: /login/i });
		await userEvent.click(loginButton);

		// Assert
		await waitFor(() => {
			expect(loginService.login).toHaveBeenCalledWith(
				validEmail,
				validPassword
			);
		});
	});

	it("should show toast on successful sign up", async () => {
		// Arrange
		const mockRegisterResponse = {
			user: { id: "user1" },
			accessToken: "token",
		};
		vi.spyOn(registerService, "register").mockResolvedValue(
			mockRegisterResponse
		);

		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, validPassword);

		const signup = screen.getByText("Sign up");
		await userEvent.click(signup);

		// Assert
		await waitFor(() => {
			expect(
				screen.getByText("Welcome to SheCoin! Your account has been created.")
			).toBeInTheDocument();
			expect(
				screen.getByText("Login to enjoy all the features!")
			).toBeInTheDocument();
		});
	});

	it("should not call register service if validation errors exist", async () => {
		// Arrange
		const registerSpy = vi.spyOn(registerService, "register");

		const emailInput = screen.getByPlaceholderText(/name@example.com/i);
		await userEvent.type(emailInput, validEmail);

		const passwordInput = screen.getByPlaceholderText(/password/i);
		await userEvent.type(passwordInput, "invalid");

		const signUpButton = screen.getByRole("button", { name: /sign up/i });
		await userEvent.click(signUpButton);

		// Assert
		expect(registerSpy).not.toHaveBeenCalled();
	});
});
