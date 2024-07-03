import "./styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";

const Header = () => {
	const accessToken = localStorage.getItem("accessToken");
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		const toastTrigger = document.getElementById("toastTrigger");
		const toast = new Toast(toastTrigger);
		toast.show();
		navigate("/home");
	};

	return (
		<>
			<div className="header sticky-top">
				<nav className="navbar navbar-expand-lg" id="navbar">
					<div className="container-fluid" id="container">
						<nav className="navbar">
							<div className="container">
								<div className="navbar-brand">
									<img
										src="./src/components/images/SheCoin.png"
										width={130}
										height={50}
										style={{ padding: "0px", margin: "0px" }}></img>
								</div>
							</div>
						</nav>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNav"
							aria-controls="navbarNav"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link to="/home" className="nav-link" id="homeLink">
										Home
									</Link>
								</li>
								{accessToken && (
									<li className="nav-item">
										<Link
											to="/watchlist"
											className="nav-link"
											id="watchlistLink">
											Watchlist
										</Link>
									</li>
								)}
								<li className="nav-item">
									{!accessToken && (
										<button
											className="btn btn-primary"
											type="submit"
											id="login">
											<Link to="/login" id="loginLink">
												Login
											</Link>
										</button>
									)}
								</li>
								<li className="nav-item">
									{accessToken && (
										<button
											className="btn btn-primary me-2"
											type="submit"
											id="logout"
											onClick={handleLogout}>
											Logout
										</button>
									)}
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<div
				className="toast-container position-fixed top-0 end-0 p-3"
				id="toastContainer">
				<div
					className="toast"
					id="toastTrigger"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
					style={{ backgroundColor: "#7f7caf", color: "white" }}>
					<div
						className="toast-header"
						style={{ backgroundColor: "#7f7caf", color: "white" }}>
						<strong className="me-auto">Logout</strong>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
					<div className="toast-body">
						You have been logged out successfully.
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
