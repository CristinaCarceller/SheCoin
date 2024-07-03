import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CryptoDetails from "../src/components/CryptoDetails.jsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { getCryptocurrencyById } from "../src/services/cryptocurrency.service.js";
import {
	getChangeColour,
	getChangeIcon,
	formatNumber,
} from "../src/components/utils/coinFormatting.jsx";

vi.mock("../src/services/cryptocurrency.service.js");

describe("CryptoDetails Component", () => {
	const mockCoin = {
		id: "bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		quote: {
			USD: {
				price: 30000,
				percent_change_90d: 5.0,
				percent_change_60d: 3.0,
				percent_change_30d: 2.0,
				percent_change_7d: 1.0,
				percent_change_24h: 2.5,
				percent_change_1h: 0.5,
				market_cap: 500000000000,
				market_cap_dominance: 45.0,
				volume_24h: 20000000000,
			},
		},
		circulating_supply: 19000000,
	};

	it("should match the snapshot", async () => {
		vi.mocked(getCryptocurrencyById).mockResolvedValue({ coin: mockCoin });

		const { asFragment } = render(
			<MemoryRouter initialEntries={["/crypto/bitcoin"]}>
				<Routes>
					<Route path="/crypto/:coinId" element={<CryptoDetails />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
