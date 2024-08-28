import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import measuresRoutes from "./measures/measures.routes";

dotenv.config();

// establish database connection
AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(measuresRoutes);

const server = app.listen(port, () => {
	console.log(`[server]: Server is running on port ${port}`);
});
