import dayjs from "dayjs";
import connection from "../db.js";

export async function createRental(req, res) {
  const { rental, game } = res.locals;
  
  const rentDate = dayjs().format("YYYY-MM-DD");
  const originalPrice = game.pricePerDay*rental.daysRented;

  const rentalObj = {
    ...rental,
    rentDate,
    returnDate: null,
    originalPrice,
    delayFee: null
  };

  try {
    await connection.query(`
      INSERT INTO rentals 
        ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, Object.values(rentalObj));
    
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}