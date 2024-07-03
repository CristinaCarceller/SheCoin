import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Watchlist from "../src/components/Watchlist.jsx";
import * as watchlistService from "../src/services/watchlist.service.js";
import CryptoTable from "../src/components/CryptoTable.jsx";
import "@testing-library/jest-dom";

vi.mock("../src/services/watchlist.service.js", () => ({
	getWatchlist: vi.fn(),
	removeFromWatchlist: vi.fn(),
}));

describe("Watchlist Component", () => {
	beforeEach(() => {
		vi.mock("../src/components/CryptoTable.jsx", () => ({
			__esModule: true,
			default: ({ coin, setTrigger }) => (
				<tr>
					<td>{coin.id}</td>
					<td>{coin.name}</td>
					<td>${coin.price_usd}</td>
					<td>{coin.percent_change_24h}%</td>
					<td>
						<button onClick={() => setTrigger((prev) => prev + 1)}>
							Remove
						</button>
					</td>
				</tr>
			),
		}));
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should display the Watchlist header", async () => {
		// Arrange

		// Act
		render(
			<MemoryRouter>
				<Watchlist />
			</MemoryRouter>
		);

		// Assert
		expect(await screen.findByText("Watchlist")).toBeInTheDocument();
	});
});
