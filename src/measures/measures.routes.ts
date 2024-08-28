import express from "express";
import MeasureController from "./measures.controller";

const routes = express.Router();

const measureController = new MeasureController();

routes.post("/upload", measureController.upload);

routes.patch("/confirm", measureController.confirm);

routes.get("/:customer_code/list", measureController.list);

export default routes;
