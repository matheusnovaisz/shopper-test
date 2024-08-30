import express from "express";
import MeasureController from "./measures.controller";
import validateConfirmation from "./validations/confirm.validation";
import validateUpload from "./validations/upload.validation";

const measuresRoutes = express.Router();

const measureController = new MeasureController();

measuresRoutes.post("/upload", validateUpload, measureController.upload);

measuresRoutes.patch(
	"/confirm",
	validateConfirmation,
	measureController.confirm
);

export default measuresRoutes;
