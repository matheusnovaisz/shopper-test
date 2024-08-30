import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../common/errors/bad-request-error";
import ConfirmRequestDto from "../dtos/ConfirmRequest.dto";

function validateConfirmation(req: Request, res: Response, next: NextFunction) {
	const requiredFields: ConfirmRequestDto = {
		confirmed_value: req.body.confirmed_value,
		measure_uuid: req.body.measure_uuid,
	};
	const missingFields: string[] = [];
	for (const key in requiredFields) {
		if (typeof requiredFields[key as keyof ConfirmRequestDto] === "undefined") {
			missingFields.push(key);
		}
	}
	if (missingFields.length > 0) {
		throw new BadRequestError({
			error_code: "INVALID_DATA",
			error_description: `Faltam as seguintes propriedades: ${missingFields.join(
				", "
			)}`,
		});
	}
	if (typeof requiredFields.confirmed_value !== "number") {
		throw new BadRequestError({
			error_code: "INVALID_DATA",
			error_description: `Tipo inválido da propriedade \'confirmed_value\': ${typeof requiredFields.confirmed_value}. Deveria ser: integer.`,
		});
	}
	if (typeof requiredFields.measure_uuid !== "string") {
		throw new BadRequestError({
			error_code: "INVALID_DATA",
			error_description: `Tipo inválido da propriedade \'confirmed_value\': ${typeof requiredFields.measure_uuid}. Deveria ser: string.`,
		});
	}

	next();
}

export default validateConfirmation;
