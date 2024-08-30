import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../common/errors/bad-request-error";
import UploadRequestDto from "../dtos/UploadRequest.dto";

const validateUpload = (req: Request, res: Response, next: NextFunction) => {
	const requiredFields: UploadRequestDto = {
		measure_type: req.body.measure_type,
		measure_datetime: req.body.measure_datetime,
		image: req.body.image,
		customer_code: req.body.customer_code,
	};
	const missingFields: string[] = [];
	for (const key in requiredFields) {
		if (!requiredFields[key as keyof UploadRequestDto]) {
			missingFields.push(key);
		}
	}
	if (missingFields.length > 0) {
		throw new BadRequestError({
			error_code: "INVALID_DATA",
			error_description: `Missing fields: ${missingFields.join(", ")}`,
		});
	}
	next();
};

export default validateUpload;
