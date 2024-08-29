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
			const { customer_code, measure_datetime, measure_type, image } = req.body;
			const { image_url, measure_value, measure_uuid } =
				await this.measureService.create({
					image,
					customer_code,
					measure_datetime,
					measure_type,
				});
			res.json({ image_url, measure_value, measure_uuid });
		} catch (error) {
			next(error);
		}
	};

	confirm = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { measure_uuid, confirmed_value } = req.body;
			const measure = await this.measureService.confirm({
				measure_uuid,
				confirmed_value,
			});
			res.json({ success: true });
		} catch (error) {
			next(error);
		}
	};
}

export default MeasureController;
