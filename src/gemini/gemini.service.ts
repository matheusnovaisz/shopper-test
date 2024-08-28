import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

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

	read = async (file: string) => {
		const imageBuffer = Buffer.from(file, "base64");
		const uploadDir = path.join(__dirname, "uploads");
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		// Create a unique filename for the image
		const filename = `image_${Date.now()}.png`; // You can change the extension if necessary
		const filePath = path.join(uploadDir, filename);
		// Write the binary data to a file
		fs.writeFile(filePath, imageBuffer, (err) => {
			if (err) {
				throw Error("Error writing file");
			}
		});

		const uploadResponse = await this.fileManager.uploadFile(filePath, {
			mimeType: "image/jpg",
		});
		console.log(uploadResponse);
		const result = await this.model.generateContent([
			{
				inlineData: {
					data: file,
					mimeType: "image/jpg",
				},
			},
			{ text: "Describe the image" },
		]);
		return result;
	};
}

export default GeminiService;
