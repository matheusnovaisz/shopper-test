import "reflect-metadata";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import Customer from "../customers/customers.model";
import { MeasureType } from "./types/measures.enum";

@Entity()
class Measure {
	@PrimaryGeneratedColumn("uuid")
	measure_uuid: string;

	@Column()
	image_url: string;

	@Column()
	measure_value: number;

	@ManyToOne(() => Customer, (customer) => customer.measures, { cascade: true })
	@JoinColumn({ name: "customer_code" })
	customer: Customer;

	@Column()
	measure_datetime: Date;

	@Column({
		type: "enum",
		enum: MeasureType,
	})
	measure_type: MeasureType;

	@Column({ default: false })
	has_confirmed: boolean;
}

export default Measure;
