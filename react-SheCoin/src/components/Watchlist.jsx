import { useState, useEffect } from "react";
import { getWatchlist } from "../services/watchlist.service";
import CryptoTable from "./CryptoTable";
import "./styles/watchlist.css";

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState([]);
	const [trigger, setTrigger] = useState(0);
	const [error, setError] = useState();
	const [selectedCoin, setSelectedCoin] = useState();

	useEffect(() => {
		const cryptocurrencyWatchlist = async () => {
			try {
				const data = await getWatchlist();
				setWatchlist(data.coins);
			} catch (error) {
				setError(error.response);
				console.log(error);
			}
		};

		cryptocurrencyWatchlist();
	}, [trigger]);

	return (
		<>
			<div
				className="text-center"
				style={{
					margin: "25px",
				}}>
				<h1 className="title">Watchlist</h1>
				<p className="instructions">
					Click{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						width={20}
						height={20}>
						<path
							fill="#7f7caf"
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/>
					</svg>{" "}
					to remove the coin to your Watchlist
				</p>
				<p className="instructions">Click on the coin for more information</p>
			</div>

			<table
				className="table table-responsive table-hover "
				style={{ margin: "50px", width: "auto" }}>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Price USD</th>
						<th scope="col">Last 24 %</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{watchlist.map((coin, index) => {
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

export default Watchlist;
