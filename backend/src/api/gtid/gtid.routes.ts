import { Router } from "express";
import { getType } from "./gtid.handlers";

const routes = Router();

routes.get("/type", getType);

export default routes;
