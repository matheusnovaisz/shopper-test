import BadRequestError from "../common/errors/bad-request-error";

type ExtensionsPermitted = "png" | "jpeg" | "webp" | "heic" | "heif";

interface FileTypeProperties {
	mimeType: string;
	extension: string;
	bytes: number[];
	extraCheck?: (buffer: Buffer) => boolean;
}

type MagicNumberType = {
	[key in ExtensionsPermitted]: FileTypeProperties;
};

/**
 * Get the mime type and extension of an image from its magic numbers
 * @param buffer - The buffer of image in base64
 * @returns mimeType and extension
 */
function getMimeTypeAndExtensionFromMagicNumbers(buffer: Buffer): {
	mimeType: string;
	ext: string;
} {
	// Define known magic numbers for PNG, JPEG, WEBP, HEIC, HEIF
	const magicNumbers: MagicNumberType = {
		png: {
			mimeType: "image/png",
			extension: "png",
			bytes: [0x89, 0x50, 0x4e, 0x47],
		},
		jpeg: {
			mimeType: "image/jpeg",
			extension: "jpg",
			bytes: [0xff, 0xd8, 0xff],
		},
		webp: {
			mimeType: "image/webp",
			extension: "webp",
			bytes: [0x52, 0x49, 0x46, 0x46], // First 4 bytes are 'RIFF'
			extraCheck: (buffer) =>
				buffer.subarray(8, 12).toString("hex") === "57454250", // 'WEBP' in hex
		},
		heic: {
			mimeType: "image/heic",
			extension: "heic",
			bytes: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ftyp
			extraCheck: (buffer) =>
				buffer.subarray(8, 12).toString("hex") === "68656963", // 'heic' in hex
		},
		heif: {
			mimeType: "image/heif",
			extension: "heif",
			bytes: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ftyp
			extraCheck: (buffer) =>
				buffer.subarray(8, 12).toString("hex") === "68656966", // 'heif' in hex
		},
	};

	// Check the file's magic number against known values
	for (const type in magicNumbers) {
		const { mimeType, extension, bytes, extraCheck } =
			magicNumbers[type as ExtensionsPermitted];
		const fileMagicNumber = buffer.subarray(0, bytes.length);

		// Check if the magic number matches
		if (bytes.every((byte, index) => fileMagicNumber[index] === byte)) {
			// If there's an extra check (e.g., for WEBP, HEIC, HEIF), run it
			if (extraCheck && !extraCheck(buffer)) {
				continue;
			}
			return { mimeType, ext: extension };
		}
	}

	throw new BadRequestError({
		error_code: "INVALID_DATA",
		error_description: "Extensão de arquivo não suportada",
	});
}

export default getMimeTypeAndExtensionFromMagicNumbers;
