import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CryptoTable from "../src/components/CryptoTable.jsx";
import {
	addToWatchlist,
	removeFromWatchlist,
} from "../src/services/watchlist.service.js";
import { MemoryRouter } from "react-router-dom";
import { vi, expect } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../src/services/watchlist.service.js");

describe("CryptoTable Component", () => {
	const mockCoin = {
		id: "bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		quote: {
			USD: {
				price: 30000,
				percent_change_24h: 2.5,
			},
		},
		inWatchlist: false,
	};
	const mockCoinInWatchlist = {
		id: "bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		quote: {
			USD: {
				price: 30000,
				percent_change_24h: 2.5,
			},
		},
		inWatchlist: true,
	};

	it("should call addToWatchlist when 'Add to Watchlist' button is clicked", async () => {
		render(
			<MemoryRouter>
				<CryptoTable
					coin={mockCoin}
					index={0}
					setTrigger={() => {}}
					setSelectedCoin={() => {}}
				/>
			</MemoryRouter>
		);
		vi.mocked(addToWatchlist).mockResolvedValue({ success: true });
		localStorage.setItem("accessToken", "dummy_token");
		const addButton = screen.getByRole("add");
		fireEvent.click(addButton);
		expect(addToWatchlist).toHaveBeenCalledWith(mockCoin.id);
	});
	it("should not call addToWatchlist when user is not logged in", async () => {
		vi.clearAllMocks();
		render(
			<MemoryRouter>
				<CryptoTable
					coin={mockCoin}
					index={0}
					setTrigger={() => {}}
					setSelectedCoin={() => {}}
				/>
			</MemoryRouter>
		);
		localStorage.removeItem("accessToken");
		vi.mocked(addToWatchlist).mockResolvedValue({ success: false });

		const addButton = screen.getByRole("add");
		fireEvent.click(addButton);
		expect(addToWatchlist).not.toHaveBeenCalled();
	});
	it("should render 'Remove from Watchlist' button if coin is in the watchlist", () => {
		render(
			<MemoryRouter>
				<CryptoTable
					coin={mockCoinInWatchlist}
					index={0}
					setTrigger={() => {}}
					setSelectedCoin={() => {}}
				/>
			</MemoryRouter>
		);
		vi.mocked(addToWatchlist).mockResolvedValue({ success: true });
		localStorage.setItem("accessToken", "dummy_token");
		const deleteButton = screen.getByRole("delete");
		fireEvent.click(deleteButton);
		expect(removeFromWatchlist).toHaveBeenCalledWith(mockCoinInWatchlist.id);
	});
});
