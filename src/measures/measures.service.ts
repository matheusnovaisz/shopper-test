import ConflictError from "../common/errors/conflict-error";
import NotFoundError from "../common/errors/not-found-error";
import { AppDataSource } from "../data-source";
import ConfirmRequestDto from "./dtos/ConfirmRequest.dto";
import CreateMeasureDto from "./dtos/CreateMeasure.dto";
import Measure from "./measures.model";

class MeasureService {
	private readonly measuresRepository;
	constructor() {
		this.measuresRepository = AppDataSource.getRepository(Measure);
	}

	create = async (measure: CreateMeasureDto) => {
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
			image_url: measure.image_url,
			measure_value: measure.measure_value,
			customer: { customer_code: measure.customer_code },
		});
	};

	confirm = async (confirm_measure: ConfirmRequestDto) => {
		const measure = await this.measuresRepository.findOneBy({
			measure_uuid: confirm_measure.measure_uuid,
		});
		if (!measure) {
			throw new NotFoundError({
				error_code: "MEASURE_NOT_FOUND",
				error_description: "Leitura não encontrada",
			});
		}
		if (measure.has_confirmed) {
			throw new ConflictError({
				error_code: "CONFIRMATION_DUPLICATE",
				error_description: "Leitura do mês já realizada",
			});
		}
		return await this.measuresRepository.save({
			measure_uuid: confirm_measure.measure_uuid,
			has_confirmed: true,
			measure_value: confirm_measure.confirmed_value,
		});
	};
}

export default MeasureService;
