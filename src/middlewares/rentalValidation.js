import connection from "../db.js";
import { rentalSchema } from "../schemas/index.js";

export default async function rentalValidation(req, res, next) { 
  const rental = req.body;

  const validation = rentalSchema.validate(rental);

  if (validation.error) {
    return res.status(400).send("invalid schema");
  };

  try {
    const customerResult = await connection.query(`
      SELECT * FROM customers
        WHERE id = $1
    `, [rental.customerId]);

    const gameResult = await connection.query(`
      SELECT * FROM games
        WHERE id = $1
    `, [rental.gameId]);
    
    if (customerResult.rowCount === 0 || gameResult.rowCount === 0) {
      return res.status(400).send("customer or game don't exist");
    }

    const game = gameResult.rows[0];

    const rentalsResult = await connection.query(`
    SELECT * FROM rentals
      WHERE "gameId" = $1
  `, [game.id]);

    if (rentalsResult.rowCount === game.stockTotal) {
      return res.status(400).send("insufficient games on stock");
    }

    res.locals.game = game;
    res.locals.rental = rental;
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }

  next();
}