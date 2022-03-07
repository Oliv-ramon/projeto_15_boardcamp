import connection from "../db.js";

export default async function rentalToFinishOrDeleteValidation (req, res, next) {
  const rentalId = req.params.id;

  try {
    const rentalResult = await connection.query(`
    SELECT * FROM rentals
      WHERE id = $1
  `, [rentalId]);

    const [rental] = rentalResult.rows;

    if (!rental) {
      console.log(rental)
      return res.status(404).send("rental unexist")
    }

    if (rental.returnDate !== null) {
      return res.status(400).send("rental already finished");
    }

    res.locals.rental = rental;
    res.locals.rentalId = rentalId;
  } catch (error){
    console.log(error)
    return res.sendStatus(500);
  }

  next();
}