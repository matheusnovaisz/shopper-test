import fs from "fs";
import path from "path";
import getMimeTypeAndExtensionFromMagicNumbers from "./filetype.validation";

/**
 *
 * @param file Imagem no formato base64
 * @returns Caminho do arquivo salvo e o tipo de arquivo
 */
const saveBase64ImageOnDisk = async (file: string) => {
	const imageBuffer = Buffer.from(file, "base64");
	const fileType = getMimeTypeAndExtensionFromMagicNumbers(imageBuffer);

	const uploadDir = path.join(__dirname, "../../uploads");
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir);
	}
	// Create a unique filename for the image
	const filename = `image_${Date.now()}.${fileType.ext}`;
	const filePath = path.join(uploadDir, filename);
	// Write the binary data to a file
	fs.writeFile(filePath, imageBuffer, (err) => {
		if (err) {
			throw Error("Error writing file");
		}
	});
	return { filePath, mimeType: fileType.mimeType };
};

export default saveBase64ImageOnDisk;
