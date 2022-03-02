import { Router } from "express";
import { gameValidation } from "../middlewares/index.js"
import { getGames, createGame } from "../controllers/gamesController.js";

const gamesRoute = Router();

gamesRoute.get("/games", getGames);
gamesRoute.post("/games", gameValidation, createGame);

export default gamesRoute;