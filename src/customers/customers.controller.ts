import { NextFunction, Request, Response } from "express";
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

			const result = await this.customerService.get_measures(customer_code, {
				measure_type: measure_type as string,
			});
			res.json(result);
		} catch (error) {
			next(error);
		}
	};
}

export default CustomerController;
