import { Router } from "express";
import { rentalValidation } from "../middlewares/index.js"
import { createRental } from "../controllers/rentalsController.js";

const rentalsRoute = Router();

/* rentalsRoute.get("/rentals", getRentals); */
rentalsRoute.post("/rentals", rentalValidation, createRental);

export default rentalsRoute;