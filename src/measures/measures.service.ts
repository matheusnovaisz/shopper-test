import ConflictError from "../common/errors/conflict-error";
import { AppDataSource } from "../data-source";
import UploadMeasureDto from "./dtos/UploadRequest.dto";
import Measure from "./measures.model";

class MeasureService {
	private readonly measuresRepository;
	constructor() {
		this.measuresRepository = AppDataSource.getRepository(Measure);
	}

	create = async (measure: UploadMeasureDto) => {
		const previousMeasure = await this.measuresRepository.findOne({
			where: {
				measure_type: measure.measure_type,
				customer: { customer_code: measure.customer_code },
			},
		});
		if (previousMeasure) {
			throw new ConflictError({
				error_code: "CONFIRMATION_DUPLICATE",
				error_description: "Leitura do mês já realizada",
			});
		}
		return await this.measuresRepository.save({
			measure_type: measure.measure_type,
			measure_datetime: measure.measure_datetime,
			image_url: measure.image,
			measure_value: 0,
			customer: { customer_code: measure.customer_code },
		});
	};
}

export default MeasureService;
