import connection from "../db";
import { categorySchema } from "../schemas";

export default function categoryValidation(req, res, next) { 
  const validation = categorySchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  };

  try {
    const category = connection.query(`
      SELECT * FROM categories
        WHERE name = $1
    `);

    if (category) {
      return res.sendStatus(409);
    }
  } catch {
    return res.sendStatus(500);
  }

  next();
}