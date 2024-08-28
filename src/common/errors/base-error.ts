class BaseError extends Error {
	status: number;
	error_code: string;
	error_description: string;
	constructor({
		error_code,
		error_description,
	}: {
		error_code: string;
		error_description: string;
	}) {
		super(error_description);
		this.name = this.constructor.name;
		this.error_code = error_code;
		this.error_description = error_description;
		this.status = 500;
	}
}

export default BaseError;
