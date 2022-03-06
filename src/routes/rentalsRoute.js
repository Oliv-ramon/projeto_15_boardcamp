import { Router } from "express";
import { rentalValidation, rentalToFinishValidation } from "../middlewares/index.js"
import { createRental, getRentals, finishRental } from "../controllers/rentalsController.js";

const rentalsRoute = Router();

rentalsRoute.post("/rentals", rentalValidation, createRental);
rentalsRoute.post("/rentals/:id/return", rentalToFinishValidation, finishRental);
rentalsRoute.get("/rentals", getRentals);

export default rentalsRoute;