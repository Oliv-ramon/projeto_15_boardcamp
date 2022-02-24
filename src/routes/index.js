import { Router } from "express";
import testRoute from "./testRoute.js";

const routes = Router();

routes.use(testRoute);

export default routes;