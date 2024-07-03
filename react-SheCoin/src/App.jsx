import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import CryptoDetails from "./components/CryptoDetails";

function App() {
	const [userId, setUserId] = useState();

	return (
		<>
			<div className="d-flex flex-column min-vh-100">
				<Header />
				<Routes>
					<Route
						path="/login"
						element={<Login userId={userId} setUserId={setUserId} />}></Route>

					<Route index element={<Home />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/watchlist" element={<Watchlist />}></Route>
					<Route path="/coin/:coinId" element={<CryptoDetails />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
