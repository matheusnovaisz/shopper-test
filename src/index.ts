import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const server = app.listen(port, () => {
	console.log(`[server]: Server is running on port ${port}`);
});
