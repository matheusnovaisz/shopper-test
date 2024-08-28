import { NextFunction, Request, Response } from "express";
import GeminiService from "../gemini/gemini.service";
import MeasureService from "./measures.service";

class MeasureController {
	private geminiService: GeminiService;
	private measureService: MeasureService;
	constructor() {
		this.geminiService = new GeminiService();
		this.measureService = new MeasureService();
	}

	upload = async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);
			const { customer_code, measure_datetime, measure_type, image } = req.body;
			const measure = await this.measureService.create({
				image,
				customer_code,
				measure_datetime,
				measure_type,
			});
			res.json(measure);
		} catch (error) {
			next(error);
		}
	};

	confirm = async (req: Request, res: Response) => {
		res.send("Patched");
	};

	list = async (req: Request, res: Response) => {
		console.log(req.params.customer_code);
		res.send("List");
	};
}

export default MeasureController;
