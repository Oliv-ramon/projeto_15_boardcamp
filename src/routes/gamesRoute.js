import { Router } from "express";
import { gameValidation } from "../middlewares/index.js"
import { getGames, createGame } from "../controllers/categoriesController.js";

const gamesRoute = Router();

gamesRoute.get("/categories", getGames);
gamesRoute.post("/categories", gameValidation, createGame);

export default gamesRoute;