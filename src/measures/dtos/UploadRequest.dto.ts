import { MeasureType } from "../types/measures.enum";

interface UploadRequestDto {
	image: string;
	customer_code: string;
	measure_datetime: Date;
	measure_type: MeasureType;
}

export default UploadRequestDto;
