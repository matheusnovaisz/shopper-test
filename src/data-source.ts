import { DataSource } from "typeorm";
import Customer from "./customers/customers.model";
import Measure from "./measures/measures.model";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "example",
	database: "example",
	synchronize: true,
	dropSchema: true,
	// logging: true,
	entities: [Measure, Customer],
	subscribers: [],
	migrations: [],
});
