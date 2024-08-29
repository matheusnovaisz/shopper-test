import express from "express";
import MeasureController from "./measures.controller";

const measuresRoutes = express.Router();

const measureController = new MeasureController();

measuresRoutes.post("/upload", measureController.upload);

measuresRoutes.patch("/confirm", measureController.confirm);

export default measuresRoutes;
