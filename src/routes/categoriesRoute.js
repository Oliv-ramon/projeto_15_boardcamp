import { Router } from "express";

const categoriesRoute = Router();

categoriesRoute.post("/", (req, res) => res.send(200));

export default categoriesRoute;