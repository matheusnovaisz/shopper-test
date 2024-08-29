import { NextFunction, Request, Response } from "express";
import BadRequestError from "../common/errors/bad-request-error";
import CustomerService from "./customers.service";

class CustomerController {
	private readonly customerService;
	constructor() {
		this.customerService = new CustomerService();
	}

	list = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { customer_code } = req.params;
			const measure_type = req.query.measure_type;
			if (
				measure_type &&
				((typeof measure_type === "string" &&
					"WATER".localeCompare(measure_type, "en", {
						sensitivity: "accent",
					}) &&
					"GAS".localeCompare(measure_type, "en", {
						sensitivity: "accent",
					})) ||
					typeof measure_type !== "string") // Evita outros tipos que não sejam strings, como array de strings que pode se passar com dois query params iguais
			) {
				throw new BadRequestError({
					error_code: "INVALID_TYPE",
					error_description: "Tipo de medição não permitida",
				});
			}
			const result = await this.customerService.get_measures(customer_code, {
				measure_type: measure_type,
			});
			res.json(result);
		} catch (error) {
			next(error);
		}
	};
}

export default CustomerController;
