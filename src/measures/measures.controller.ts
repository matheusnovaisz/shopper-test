import { Request, Response } from "express";
import GeminiService from "../gemini/gemini.service";
import MeasureService from "./measures.service";

class MeasureController {
	private geminiService: GeminiService;
	private measureService: MeasureService;
	constructor() {
		this.geminiService = new GeminiService();
		this.measureService = new MeasureService();
	}

	upload = async (req: Request, res: Response) => {
		const { image } = req.body;
		// const response = await this.geminiService.read(req.body.image);
		res.send("response");
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
