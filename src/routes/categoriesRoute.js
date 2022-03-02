import { Router } from "express";
import { categoryValidation } from "../middlewares/index.js"
import { createCategory } from "../controllers/index.js";

const categoriesRoute = Router();

categoriesRoute.post("/categories", categoryValidation,createCategory);

export default categoriesRoute;