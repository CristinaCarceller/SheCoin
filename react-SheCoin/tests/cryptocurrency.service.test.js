import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
	getCryptocurrencies,
	getCryptocurrencyById,
} from "../src/services/cryptocurrency.service.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("cryptocurrency service", () => {
	let mock;
	const baseURL = import.meta.env.VITE_APP_USER_URL;

	beforeEach(() => {
		mock = new MockAdapter(axios);
		localStorage.setItem("accessToken", "fakeToken");
	});

	afterEach(() => {
		localStorage.removeItem("accessToken");
		mock.reset();
	});

	it("should get all cryptocurrencies", async () => {
		// Arrange
		const cryptocurrenciesData = {
			cryptocurrencies: [
				{ id: 1, name: "Bitcoin", symbol: "BTC" },
				{ id: 2, name: "Ethereum", symbol: "ETH" },
			],
		};

		mock
			.onGet(`${baseURL}/cryptocurrency`, {
				headers: { "X-Access-Token": "fakeToken" },
			})
			.reply(200, cryptocurrenciesData);

		// Act
		const result = await getCryptocurrencies();

		// Assert
		expect(result).toEqual(cryptocurrenciesData);
	});

	it("should handle errors when getting all cryptocurrencies", async () => {
		// Arrange
		mock
			.onGet(`${baseURL}/cryptocurrency`, {
				headers: { "X-Access-Token": "fakeToken" },
			})
			.reply(500, { message: "Internal Server Error" });

		// Act
		const result = await getCryptocurrencies();

		// Assert
		expect(result).toBeUndefined();
	});

	it("should get a cryptocurrency by ID", async () => {
		// Arrange
		const coinId = 1;
		const cryptocurrencyData = { id: 1, name: "Bitcoin", symbol: "BTC" };

		mock
			.onGet(`${baseURL}/cryptocurrency/${coinId}`)
			.reply(200, cryptocurrencyData);

		// Act
		const result = await getCryptocurrencyById(coinId);

		// Assert
		expect(result).toEqual(cryptocurrencyData);
	});

	it("should handle errors when getting a cryptocurrency by ID", async () => {
		// Arrange
		const coinId = 1;

		mock
			.onGet(`${baseURL}/cryptocurrency/${coinId}`)
			.reply(404, { message: "Internal Server Error" });

		// Act
		const result = await getCryptocurrencyById(coinId);

		// Assert
		expect(result).toBeUndefined();
	});

	it("should log a message when no coinId is provided for getCryptocurrencyById", async () => {
		// Arrange
		console.log = vi.fn();

		// Act
		await getCryptocurrencyById();

		// Assert
		expect(console.log).toHaveBeenCalledWith("Coin ID is required");
	});
});
