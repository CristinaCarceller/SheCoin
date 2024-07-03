import { useState } from "react";
import { validate } from "./utils/validation.js";
import { register } from "../services/register.service.js";
import { login } from "../services/login.service.js";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import { Toast } from "bootstrap";

const Login = ({ userId, setUserId }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		const validation = validate(email, password);

		if (validation.message) {
			setErrorMessage(validation.message);
			return;
		}
		const response = await register(email, password);
		if (!response.user) {
			setErrorMessage(response.message);
		} else {
			setErrorMessage("");
			const toastElement = document.getElementById("signUpToast");
			if (toastElement) {
				const toast = new Toast(toastElement);
				toast.show();
			}
		}

		setEmail("");
		setPassword("");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await login(email, password);

			if (!response.id) {
				setErrorMessage(response.message);
			} else {
				localStorage.setItem("accessToken", response.accessToken);
				setErrorMessage("");
				setUserId(response.id);
				navigate("/home");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="loginBackground">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6 col-lg-4" id="loginForm">
							<div className="card text-center" id="cardBackground">
								<div className="card-body" id="cardBody">
									<div className="mb-3">
										<label htmlFor="emailInput" className="form-label">
											Email address
										</label>
										<input
											type="email"
											className="form-control"
											id="emailInput"
											placeholder="name@example.com"
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											required></input>
									</div>
									<label htmlFor="passwordInput" className="form-label">
										Password
									</label>
									<input
										type="password"
										id="passwordInput"
										className="form-control"
										aria-describedby="passwordHelpBlock"
										placeholder="password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										required></input>
									{errorMessage && (
										<div className="text-danger">{errorMessage}</div>
									)}

									<div
										id="passwordHelpBlock"
										className="form-text"
										style={{ color: "#a3a0a0" }}>
										Your password must have at least 8 characters, at least one
										uppercase character, at least one lowercase character, at
										least one special character
									</div>

									<button
										className="btn btn-primary"
										id="btnLogin"
										onClick={(e) => handleLogin(e)}>
										Login
									</button>
									<button
										className="btn btn-primary"
										id="btnSign"
										onClick={(e) => handleSignUp(e)}>
										Sign up
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="toast-container position-fixed top-0 end-0 p-3"
				id="toastContainer">
				<div
					className="toast"
					id="signUpToast"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<div
						className="toast-header"
						style={{ backgroundColor: "#7f7caf", color: "white" }}>
						<strong className="me-auto">Sign Up Successful</strong>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
					<div
						className="toast-body"
						style={{ backgroundColor: "#7f7caf", color: "white" }}>
						<p>Welcome to SheCoin! Your account has been created.</p>
						<p>Login to enjoy all the features!</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
