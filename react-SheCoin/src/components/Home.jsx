import { useState, useEffect } from "react";
import { getCryptocurrencies } from "../services/cryptocurrency.service";
import CryptoTable from "./CryptoTable";
import { Tooltip } from "bootstrap";
import "./styles/home.css";

const Home = () => {
	const [trigger, setTrigger] = useState(0);
	const [cryptocurrency, setCryptocurrency] = useState([]);
	const [selectedCoin, setSelectedCoin] = useState();
	const [error, setError] = useState();

	if (!cryptocurrency) {
		return <div>Loading...</div>;
	}
	useEffect(() => {
		const cryptocurrencyData = async () => {
			try {
				const data = await getCryptocurrencies();
				setCryptocurrency(data.coins);
			} catch (error) {
				setError(error.message);
			}
		};

		cryptocurrencyData();
	}, [trigger]);

	if (error) {
		return <p>Error:{error}</p>;
	}
	useEffect(() => {
		const tooltipTriggerList = document.querySelectorAll(
			'[data-bs-toggle="tooltip"]'
		);
		const tooltipList = [...tooltipTriggerList].map(
			(tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
		);
		return () => {
			tooltipList.forEach((tooltip) => tooltip.dispose());
		};
	}, []);

	return (
		<>
			<div
				className="text-center"
				style={{
					marginTop: "20px",
				}}>
				<h1 className="title">Top 100 Cryptocurrencies</h1>
				<p className="instructions">
					Click{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						width={20}
						height={20}>
						<path
							fill="#7f7caf"
							d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
						/>
					</svg>{" "}
					to add the coin to your Watchlist
				</p>
				<p className="instructions">Click on the coin for more information</p>
			</div>

			<table
				className="table  table-hover"
				style={{ margin: "50px", width: "auto" }}>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Price USD</th>
						<th scope="col">
							Last 24 %
							<button
								role="tooltip"
								type="button"
								className="btn btn-secondary"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								data-bs-custom-class="custom-tooltip"
								data-bs-title="Price variance on the last 24 hours"
								style={{ background: "none", border: "none" }}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									width={15}
									height={15}>
									<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
								</svg>
							</button>
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{cryptocurrency.map((coin, index) => {
						return (
							<CryptoTable
								key={coin.id}
								coin={coin}
								index={index}
								setTrigger={setTrigger}
								setSelectedCoin={setSelectedCoin}
							/>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Home;
