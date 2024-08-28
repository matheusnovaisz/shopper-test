import BaseError from "./base-error";

class ConflictError extends BaseError {
	constructor({
		error_code,
		error_description,
	}: {
		error_code: string;
		error_description: string;
	}) {
		super({ error_code, error_description });
		this.status = 409;
	}
}

export default ConflictError;
