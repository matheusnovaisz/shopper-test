import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from "dotenv";

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
		this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
				text: "Read the meter and return the number as plain text, without any extra formatting, characters, or whitespace. The output should be just the number itself. If you can't read the meter, please return throw an Error.",
			},
		]);
		return result;
	};
}

export default GeminiService;
