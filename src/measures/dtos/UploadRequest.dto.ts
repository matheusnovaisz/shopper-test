import { MeasureType } from "../types/measures.enum";

class UploadMeasureDto {
	image: string;
	customer_code: string;
	measure_datetime: Date;
	measure_type: MeasureType;
}

export default UploadMeasureDto;
