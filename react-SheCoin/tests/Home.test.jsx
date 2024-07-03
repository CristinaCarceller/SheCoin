import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Home from "../src/components/Home.jsx";
import { MemoryRouter } from "react-router-dom";
import * as cryptocurrencyService from "../src/services/cryptocurrency.service.js";
import "@testing-library/jest-dom";

vi.mock("../src/services/cryptocurrency.service.js", () => ({
	getCryptocurrencies: vi.fn(),
}));

describe("Home Component", () => {
	it("should display a list of cryptocurrencies", async () => {
		const mockCryptocurrencies = {
			coins: [
				{
					id: "bitcoin",
					name: "Bitcoin",
					quote: {
						USD: {
							price: 30000,
							percent_change_24h: 2.5,
						},
					},
					symbol: "BTC",
					inWatchlist: false,
				},
				{
					id: "ethereum",
					name: "Ethereum",
					quote: {
						USD: {
							price: 2000,
							percent_change_24h: -1.5,
						},
					},
					symbol: "ETH",
					inWatchlist: true,
				},
			],
		};

		cryptocurrencyService.getCryptocurrencies.mockResolvedValueOnce(
			mockCryptocurrencies
		);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText(/Top 100 Cryptocurrencies/i)).toBeInTheDocument();
			expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
			expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
		});
	});

	it("should initialize tooltips for the 'Last 24 %' column", async () => {
		const mockCryptocurrencies = {
			coins: [
				{
					id: "bitcoin",
					name: "Bitcoin",
					quote: {
						USD: {
							price: 30000,
							percent_change_24h: 2.5,
						},
					},
					symbol: "BTC",
					inWatchlist: false,
				},
			],
		};

		cryptocurrencyService.getCryptocurrencies.mockResolvedValueOnce(
			mockCryptocurrencies
		);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		await waitFor(() => {
			const tooltipButton = screen.getByRole("tooltip");
			expect(tooltipButton).toBeInTheDocument();
		});
	});
});
