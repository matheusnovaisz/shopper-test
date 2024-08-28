import { DataSource } from "typeorm";
import Measure from "./measures/measures.model";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "example",
	database: "example",
	synchronize: true,
	logging: true,
	entities: [Measure],
	subscribers: [],
	migrations: [],
});
