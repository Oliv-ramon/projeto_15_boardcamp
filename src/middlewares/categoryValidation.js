import connection from "../db.js";
import { categorySchema } from "../schemas/index.js";

export default async function categoryValidation(req, res, next) { 
  const validation = categorySchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  };

  try {
    const query = await connection.query(`
      SELECT * FROM categories
        WHERE name = $1
    `, [req.body.name]);

    const category = query.rows[0];

    if (category) {
      return res.sendStatus(409);
    }
  } catch {
    return res.sendStatus(500);
  }

  next();
}