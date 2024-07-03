import Config from "./src/configuration/Config.js";
import AuthRoutes from "./src/routes/Auth.routes.js";
import Server from "./src/server/Server.js";
import Database from "./src/database/Database.js";
import RegisterRoutes from "./src/routes/Register.route.js";
import CryptoRoutes from "./src/routes/cryptocurrency.route.js";
import WatchlistRoutes from "./src/routes/Watchlist.routes.js";

Config.load();

console.log("CMC_PRO_API_KEY:", process.env.CMC_PRO_API_KEY); // Should output your actual API key value

const { PORT, HOST, DB_URI } = process.env;
const authRouter = new AuthRoutes();
const registerRouter = new RegisterRoutes();
const cryptoRouter = new CryptoRoutes();
const watchlistRouter = new WatchlistRoutes();

const server = new Server(PORT, HOST, [
	authRouter,
	registerRouter,
	cryptoRouter,
	watchlistRouter,
]);
const database = new Database(DB_URI);

server.start();
database.connect();
