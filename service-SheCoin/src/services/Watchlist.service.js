export default class WatchlistService {
	addCoinId = async ({ user, coinId }) => {
		user.watchlist.push(coinId);

		await user.save();
	};

	removeCoinId = async ({ user, coinId }) => {
		const oldWatchlist = [...user.watchlist];

		const newWatchlist = oldWatchlist.filter((existingCoinId) => {
			return existingCoinId !== coinId;
		});

		console.log({ oldWatchlist, newWatchlist });
		user.watchlist = newWatchlist;

		await user.save();
		return newWatchlist;
	};
}
