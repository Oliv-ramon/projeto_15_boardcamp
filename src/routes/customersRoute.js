import { Router } from "express";
import { customerValidation } from "../middlewares/index.js"
import { getCustomers, createCustomer, getCustomerById } from "../controllers/customersController.js";

const customersRoute = Router();

customersRoute.get("/customers", getCustomers);
customersRoute.get("/customers/:id", getCustomerById);
customersRoute.post("/customers", customerValidation, createCustomer);

export default customersRoute;