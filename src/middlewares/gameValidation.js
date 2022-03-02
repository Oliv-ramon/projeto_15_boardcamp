import connection from "../db.js";
import { gameSchema } from "../schemas/index.js";

export default async function gameValidation(req, res, next) {
  const game = req.body;

  try {
    const categoriesIdsQuery = await connection.query(`SELECT id FROM categories`);
    const validsCategoriesIds = categoriesIdsQuery.rows;
    
    const validation = gameSchema.validate(game);
    const secondaryValidation = 
      Number(game.stockTotal) < 0 ||
      Number(game.pricePerDay) < 0 ||
      !validsCategoriesIds.some(({ id }) => id === game.categoryId);

    if (validation.error || secondaryValidation) {
      return res.sendStatus(400);
    };

    const query = await connection.query(`
      SELECT * FROM games
        WHERE name = $1
    `, [game.name]);

    const gameOnDb = query.rows[0];

    if (gameOnDb) {
      return res.sendStatus(409);
    }
  } catch (error){
    console.log(error)
    return res.sendStatus(500);
  }

  next();
}