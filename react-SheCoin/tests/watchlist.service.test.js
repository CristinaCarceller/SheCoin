import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
} from "../src/services/watchlist.service.js";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("watchlist service", () => {
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

	it("should get watchlist data", async () => {
		const watchlistData = { coins: [{ id: 1, name: "Bitcoin" }] };

		mock
			.onGet(`${baseURL}/watchlist`, {
				headers: { "X-Access-Token": "fakeToken" },
			})
			.reply(200, watchlistData);

		const result = await getWatchlist();

		expect(result).toEqual(watchlistData);
	});

	it("should handle errors when getting watchlist data", async () => {
		mock
			.onGet(`${baseURL}/watchlist`, {
				headers: { "X-Access-Token": "fakeToken" },
			})
			.reply(500, { message: "Internal Server Error" });

		const result = await getWatchlist();

		expect(result).toBeUndefined();
	});

	it("should handle errors when adding a coin to the watchlist", async () => {
		const coinId = 1;

		mock
			.onPost(
				`${baseURL}/watchlist/add`,
				{ coinId },
				{
					headers: { "X-Access-Token": "fakeToken" },
				}
			)
			.reply(500, { message: "Internal Server Error" });

		const result = await addToWatchlist(coinId);

		expect(result).toBeUndefined();
	});

	it("should handle errors when removing a coin from the watchlist", async () => {
		const coinId = 1;

		mock
			.onPost(
				`${baseURL}/watchlist/delete`,
				{ coinId },
				{
					headers: { "X-Access-Token": "fakeToken" },
				}
			)
			.reply(500, { message: "Internal Server Error" });

		const result = await removeFromWatchlist(coinId);

		expect(result).toBeUndefined();
	});
});
