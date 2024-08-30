import { NextFunction, Request, Response } from "express";
import GeminiService from "../gemini/gemini.service";
import saveBase64ImageOnDisk from "../image/upload.service";
import UploadRequestDto from "./dtos/UploadRequest.dto";
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
			const {
				customer_code,
				measure_datetime,
				measure_type,
				image,
			}: UploadRequestDto = req.body;

			const { filePath, mimeType } = await saveBase64ImageOnDisk(image);

			const geminiResponse = await this.geminiService.read(image, mimeType);

			// Save the image to the database
			const { image_url, measure_value, measure_uuid } =
				await this.measureService.create({
					image_url: filePath,
					customer_code,
					measure_datetime,
					measure_type,
					measure_value: geminiResponse,
				});
			res.json({ image_url, measure_value, measure_uuid });
		} catch (error) {
			next(error);
		}
	};

	confirm = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { measure_uuid, confirmed_value } = req.body;
			await this.measureService.confirm({
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
