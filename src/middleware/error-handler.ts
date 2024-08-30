import { NextFunction, Request, Response } from "express";
import BaseError from "../common/errors/base-error";

function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof BaseError) {
		res.status(err.status).json({
			error_code: err.error_code,
			error_description: err.error_description,
		});
	} else {
		console.error(err);
		res.status(500).json({
			error_code: "INTERNAL_SERVER_ERROR",
			error_description: "Internal Server Error",
		});
	}
}

export default errorHandler;
