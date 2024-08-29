import UploadRequestDto from "./UploadRequest.dto";

interface CreateMeasureDto
	extends Pick<
		UploadRequestDto,
		"customer_code" | "measure_datetime" | "measure_type"
	> {
	image_url: string;
	measure_value: number;
}
export default CreateMeasureDto;
