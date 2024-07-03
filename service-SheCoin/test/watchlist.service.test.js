import { assert, expect } from "chai";
import Sinon from "sinon";
import WatchlistService from "../src/services/Watchlist.service.js";
import User from "../src/models/User.model.js";

describe("WatchlistService", () => {
	let watchlistService;
	let userSaveStub;

	beforeEach(() => {
		watchlistService = new WatchlistService();
		userSaveStub = Sinon.stub(User.prototype, "save");
	});

	afterEach(() => {
		userSaveStub.restore();
	});

	describe("addCoinId", () => {
		it("should add a coin ID to the user's watchlist and save the user", async () => {
			const mockUser = {
				watchlist: [],
				save: userSaveStub.resolves(),
			};

			const coinId = "12345";

			await watchlistService.addCoinId({ user: mockUser, coinId });

			expect(mockUser.watchlist).to.include(coinId);
			expect(userSaveStub.calledOnce).to.be.true;
		});

		it("should handle errors during the save operation", async () => {
			const mockUser = {
				watchlist: [],
				save: userSaveStub.rejects(new Error("Save failed")),
			};

			const coinId = "12345";

			try {
				await watchlistService.addCoinId({ user: mockUser, coinId });
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Save failed");
			}
		});
	});

	describe("removeCoinId", () => {
		it("should remove a coin ID from the user's watchlist and save the user", async () => {
			const mockUser = {
				watchlist: ["12345", "67890"],
				save: userSaveStub.resolves(),
			};

			const coinId = "12345";

			await watchlistService.removeCoinId({ user: mockUser, coinId });

			expect(mockUser.watchlist).to.not.include(coinId);
			expect(userSaveStub.calledOnce).to.be.true;
		});

		it("should correctly update the watchlist by removing the specified coin ID", async () => {
			const mockUser = {
				watchlist: ["12345", "67890"],
				save: userSaveStub.resolves(),
			};

			const coinId = "12345";

			await watchlistService.removeCoinId({ user: mockUser, coinId });

			const oldWatchlist = ["12345", "67890"];
			const newWatchlist = ["67890"];

			expect(mockUser.watchlist).to.deep.equal(newWatchlist);
		});

		it("should handle errors during the save action", async () => {
			const mockUser = {
				watchlist: ["12345", "67890"],
				save: userSaveStub.rejects(new Error("Save failed")),
			};

			const coinId = "12345";

			try {
				await watchlistService.removeCoinId({ user: mockUser, coinId });
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
				expect(error.message).to.equal("Save failed");
			}
		});
	});
});
