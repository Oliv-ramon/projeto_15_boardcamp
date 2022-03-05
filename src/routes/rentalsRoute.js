import { Router } from "express";
import { rentalValidation } from "../middlewares/index.js"
import { createRental, getRentals } from "../controllers/rentalsController.js";

const rentalsRoute = Router();

rentalsRoute.post("/rentals", rentalValidation, createRental);
rentalsRoute.get("/rentals", getRentals);

export default rentalsRoute;