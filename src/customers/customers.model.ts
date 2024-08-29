import "reflect-metadata";
import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import Measure from "../measures/measures.model";

@Entity()
class Customer {
	@PrimaryColumn()
	customer_code: string;

	@OneToMany(() => Measure, (measure) => measure.customer)
	measures: Measure[];
}

export default Customer;
