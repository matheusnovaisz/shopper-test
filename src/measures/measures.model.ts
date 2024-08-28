import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MeasureType } from "./types/measures.enum";

@Entity()
class Measure {
	@PrimaryGeneratedColumn("uuid")
	measure_uuid: string;

	@Column()
	image_url: string;

	@Column()
	measure_value: number;

	@Column()
	customer_code: string;

	@Column()
	measure_datetime: Date;

	@Column({
		type: "enum",
		enum: MeasureType,
	})
	measure_type: MeasureType;
}

export default Measure;
