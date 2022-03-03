import connection from "../db.js";
import { customerSchema } from "../schemas/index.js";

export default async function customerValidation(method) {
  return async (req, res, next) => {
    const validation = customerSchema.validate(req.body);
    
    if (validation.error) {
      return res.sendStatus(400);
    }
  
    try {
      const query = await connection.query(`
        SELECT * FROM customers
          WHERE cpf = $1
      `, [req.body.cpf]);
  
      const customer = query.rows[0];
  
      if (customer && method === "post") {
        return res.sendStatus(409);
      } 
      
      if (!customer && method === "put") {
        return res.sendStatus(409);
      }
  
    } catch (error){
      console.log(error)
      return res.sendStatus(500);
    }
  
    next();
  }
}