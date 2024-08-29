import express from "express";
import CustomerController from "./customers.controller";

const customerController = new CustomerController();

const customerRoutes = express.Router();

customerRoutes.get("/:customer_code/list", customerController.list);

export default customerRoutes;
