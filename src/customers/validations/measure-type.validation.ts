import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../common/errors/bad-request-error";

function validateMeasureType(req: Request, res: Response, next: NextFunction) {
	const { measure_type } = req.query;
	if (
		measure_type &&
		((typeof measure_type === "string" &&
			"WATER".localeCompare(measure_type, "en", {
				sensitivity: "accent",
			}) &&
			"GAS".localeCompare(measure_type, "en", {
				sensitivity: "accent",
			})) ||
			typeof measure_type !== "string") // Evita outros tipos que não sejam strings, como array de strings que pode se passar com dois query params iguais
	) {
		throw new BadRequestError({
			error_code: "INVALID_TYPE",
			error_description: "Tipo de medição não permitida",
		});
	}
	next();
}

export default validateMeasureType;
