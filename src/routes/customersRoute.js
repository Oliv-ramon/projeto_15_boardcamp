import { Router } from "express";
import { customerValidation } from "../middlewares/index.js"
import { getCustomers, createCustomer } from "../controllers/customersController.js";

const customersRoute = Router();

customersRoute.get("/customers", getCustomers);
customersRoute.post("/customers", customerValidation, createCustomer);

export default customersRoute;