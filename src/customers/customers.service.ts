import NotFoundError from "../common/errors/not-found-error";
import { AppDataSource } from "../data-source";
import { MeasureType } from "../measures/types/measures.enum";
import Customer from "./customers.model";

class CustomerService {
	private customersRepository;
	constructor() {
		this.customersRepository = AppDataSource.getRepository(Customer);
	}

	get_measures = async (
		customer_code: string,
		{ measure_type }: { measure_type?: string }
	) => {
		const result = await this.customersRepository.findOne({
			where: {
				customer_code,
				measures: { measure_type: measure_type?.toUpperCase() as MeasureType },
			},
			relations: ["measures"],
			select: {
				customer_code: true,
				measures: {
					measure_uuid: true,
					measure_datetime: true,
					measure_type: true,
					has_confirmed: true,
					image_url: true,
				},
			},
		});
		if (!result || result.measures.length === 0) {
			throw new NotFoundError({
				error_code: "MEASURES_NOT_FOUND",
				error_description: "Nenhuma leitura encontrada",
			});
		}
		return result;
	};
}

export default CustomerService;
