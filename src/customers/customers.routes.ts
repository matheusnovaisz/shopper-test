import express from "express";
import CustomerController from "./customers.controller";
import validateMeasureType from "./validations/measure-type.validation";

const customerController = new CustomerController();

const customerRoutes = express.Router();

customerRoutes.get(
	"/:customer_code/list",
	validateMeasureType,
	customerController.list
);

export default customerRoutes;
