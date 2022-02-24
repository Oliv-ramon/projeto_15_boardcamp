import { Router } from "express";

const testRoute = Router();

testRoute.get("/", (req, res) => res.send(200));

export default testRoute;