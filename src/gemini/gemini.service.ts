import {
	GenerativeModel,
	GoogleGenerativeAI,
	SchemaType,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from "dotenv";
import BadRequestError from "../common/errors/bad-request-error";

dotenv.config();

class GeminiService {
	private readonly model: GenerativeModel;
	private readonly fileManager: GoogleAIFileManager;
	constructor() {
		const api_key = process.env.GEMINI_API_KEY;
		if (!api_key) {
			throw new Error("API Key is required");
		}
		const genAI = new GoogleGenerativeAI(api_key);
		this.fileManager = new GoogleAIFileManager(api_key);
		this.model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash",
			generationConfig: {
				responseMimeType: "application/json",
				responseSchema: {
					type: SchemaType.OBJECT,
					properties: {
						measure_value: {
							type: SchemaType.INTEGER,
							nullable: false,
						},
						error: {
							type: SchemaType.BOOLEAN,
							nullable: false,
						},
						error_message: {
							type: SchemaType.STRING,
						},
					},
				},
			},
		});
	}

	read = async (file: string, mimeType: string) => {
		const result = await this.model.generateContent([
			{
				inlineData: {
					data: file,
					mimeType,
				},
			},
			{
				text: "Read the meter and return the number as plain text, without any extra formatting, characters, or whitespace. The output should be just the number itself, in the measure_value property. If you can't return a value for the meter, please return true on the error property and provide an error_message in Portuguese giving the reason why you can't provide the measure value.",
			},
		]);
		const object_response = JSON.parse(result.response.text());
		if (object_response.error) {
			throw new BadRequestError({
				error_code: "INVALID_DATA",
				error_description: object_response.error_message,
			});
		}
		if (object_response.measure_value === undefined) {
			throw new Error("Invalid response from Gemini");
		}
		return Number(object_response.measure_value);
	};
}

export default GeminiService;
