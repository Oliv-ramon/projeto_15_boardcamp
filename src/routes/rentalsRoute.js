import { Router } from "express";
import { rentalValidation, rentalToFinishOrDeleteValidation } from "../middlewares/index.js"
import { createRental, getRentals, finishRental, deleteRental } from "../controllers/rentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", rentalValidation, createRental);
rentalsRoute.post("/rentals/:id/return", rentalToFinishOrDeleteValidation, finishRental);
rentalsRoute.delete("/rentals/:id", rentalToFinishOrDeleteValidation, deleteRental);

export default rentalsRoute;