import { Router } from "express";
import { customerValidation } from "../middlewares/index.js"
import { getCustomers, createCustomer, getCustomerById, updateCustomer } from "../controllers/customersController.js";

const customersRoute = Router();

customersRoute.get("/customers", getCustomers);
customersRoute.get("/customers/:id", getCustomerById);
customersRoute.post("/customers", await customerValidation("post"), createCustomer);
customersRoute.put("/customers/:id", await customerValidation("put"), updateCustomer);

export default customersRoute;