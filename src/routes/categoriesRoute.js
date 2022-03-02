import { Router } from "express";
import { categoryValidation } from "../middlewares/index.js"
import { getCategories, createCategory } from "../controllers/categoriesController.js";

const categoriesRoute = Router();

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post("/categories", categoryValidation, createCategory);

export default categoriesRoute;