import connection from "../db.js";
import { customerSchema } from "../schemas/index.js";

export default async function customerlidation(req, res, next) {
  const validation = customerSchema.validate(req.body);
  
  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const query = await connection.query(`
      SELECT * FROM customers
        WHERE name = $1
    `, [req.body.name]);

    const customer = query.rows[0];

    if (customer) {
      return res.sendStatus(409);
    }
  } catch (error){
    console.log(error)
    return res.sendStatus(500);
  }

  next();
}