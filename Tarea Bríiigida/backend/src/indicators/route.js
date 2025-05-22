import { Router } from "express";
import { Controller } from "./controller.js";

export class IndicatorRoute {
  static get route() {
    const router = Router();
    const controller = new Controller();
    router.get("/", controller.getAllIndicators.bind(controller));
    router.get("/:id", controller.getIndicatorById.bind(controller));
    return router;
  }
}

