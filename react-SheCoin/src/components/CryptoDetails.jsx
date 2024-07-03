import { useState, useEffect } from "react";
import { getCryptocurrencyById } from "../services/cryptocurrency.service";
import { useParams } from "react-router-dom";
import {
	getChangeColour,
	getChangeIcon,
	formatNumber,
} from "./utils/coinFormatting";
import PriceLineChart from "./CoinChart";
import { Tooltip } from "bootstrap";
import "./styles/cryptoDetails.css";

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [coin, setCoin] = useState();
	const [error, setError] = useState();

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

	useEffect(() => {
		const cryptocurrencyData = async () => {
			try {
				const data = await getCryptocurrencyById(coinId);

				setCoin(data.coin);
			} catch (error) {
				setError(error.message);
			}
		};

		cryptocurrencyData();
	}, [coinId]);

	if (!coin) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	const price = coin.quote.USD.price.toFixed(2);

	const percentChangeData = [
		{ period: "90 Days", percentChange: coin.quote.USD.percent_change_90d },
		{ period: "60 Days", percentChange: coin.quote.USD.percent_change_60d },
		{ period: "30 Days", percentChange: coin.quote.USD.percent_change_30d },
		{ period: "7 Days", percentChange: coin.quote.USD.percent_change_7d },
		{ period: "24 Hours", percentChange: coin.quote.USD.percent_change_24h },
		{ period: "1 Hour", percentChange: coin.quote.USD.percent_change_1h },
	];

	return (
		<div>
			<div className="text-center" id="title">
				<h1>
					More info about: {coin.name} ({coin.symbol})
				</h1>
			</div>
			<div className="container mx-auto" id="cardContainer">
				<div className="row justify-content-md-center">
					<div className="col-md-6">
						<div
							className="card"
							style={{ width: "35rem", height: "21rem" }}
							id="infoBackground">
							<div className="card-body" id="infoBody">
								<div className="moreInfo">
									<h5 className="d-inline">Price USD: </h5>
									<p className="d-inline">${formatNumber(price)}</p>
								</div>
								{[
									"percent_change_1h",
									"percent_change_24h",
									"percent_change_7d",
								].map((changeType, index) => {
									const percentChange = coin.quote.USD[changeType];
									return (
										<div className="moreInfo" key={index}>
											<h5 className="d-inline">
												{changeType.replace("percent_change_", "")}(%):{" "}
											</h5>
											<div className="d-inline">
												{getChangeIcon(percentChange)}
												{Math.abs(percentChange).toFixed(2)}%
											</div>
										</div>
									);
								})}
								<div className="moreInfo">
									<h5 className="d-inline">Circulating supply: </h5>
									<p className="d-inline">
										{formatNumber(coin.circulating_supply)} {coin.symbol}
									</p>
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-toggle="tooltip"
										data-bs-placement="top"
										data-bs-custom-class="custom-tooltip"
										data-bs-title="The amount of coins that are circulating in the market and are in public hands"
										style={{ background: "none", border: "none" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											width={15}
											height={15}>
											<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
										</svg>
									</button>
								</div>
								<div className="moreInfo">
									<h5 className="d-inline"> Market cap:</h5>{" "}
									<p className="d-inline">
										${formatNumber(coin.quote.USD.market_cap.toFixed(2))}
									</p>
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-toggle="tooltip"
										data-bs-placement="top"
										data-bs-custom-class="custom-tooltip"
										data-bs-title="The total market value of a cryptocurrency's circulating supply. Market Cap = Current Price x Circulating Supply"
										style={{ background: "none", border: "none" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											width={15}
											height={15}>
											<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
										</svg>
									</button>
								</div>
								<div className="moreInfo">
									<h5 className="d-inline">Market dominance: </h5>
									<p className="d-inline">
										{formatNumber(
											coin.quote.USD.market_cap_dominance.toFixed(2)
										)}
									</p>
									%
								</div>
								<div className="moreInfo">
									<h5 className="d-inline">Volume 24h:</h5>
									<p className="d-inline">
										${formatNumber(coin.quote.USD.volume_24h.toFixed(2))}
									</p>
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-toggle="tooltip"
										data-bs-placement="top"
										data-bs-custom-class="custom-tooltip"
										data-bs-title="A mesure of how much of a cryptocurrency was traded in the last 24 hours"
										style={{ background: "none", border: "none" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											width={15}
											height={15}>
											<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-5">
						<div
							className="card"
							style={{ width: "35rem", height: "21rem" }}
							id="chartBackground">
							<div className="card-body" id="chartBody">
								<PriceLineChart percentChangeData={percentChangeData} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CryptoDetails;
