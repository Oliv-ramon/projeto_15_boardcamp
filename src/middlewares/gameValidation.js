import connection from "../db.js";
import { gameSchema } from "../schemas/index.js";

export default async function gameValidation(req, res, next) {
  const game = req.body;

  const validation = gameSchema.validate(game);
  const secondayValidation = Number(game.stockTotal) > 0 && Number(game.pricePerDay) > 0;

  if (validation.error || !secondayValidation) {
    return res.sendStatus(400);
  };

  try {
    const query = await connection.query(`
      SELECT * FROM categories
        WHERE name = $1
    `, [req.body.name]);

    const gameOnDb = query.rows[0];

    if (gameOnDb) {
      return res.sendStatus(409);
    }
  } catch {
    return res.sendStatus(500);
  }

  next();
}