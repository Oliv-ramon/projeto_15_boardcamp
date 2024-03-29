import connection from "../db.js";
import { rentalFormatToSend } from "../schemas/rentalSchema.js";

export async function createRental(_req, res) {
  const { rental, game } = res.locals;
  
  const rentDate = new Date();

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

export async function getRentals(req, res) {
  const { customerId, gameId, status, startDate } = req.query;
  
  let filter = "";
  if (customerId) {
    filter = `WHERE "customerId" = ${customerId}`;
  }
  if (gameId) {
    filter = `WHERE "gameId" = ${gameId}`;
  }
  if (status) {
    filter = `WHERE "returnDate" ${status === "open" ? "IS" : "IS NOT"} NULL`;
  }

  try {
    const rentalsResult = await connection.query(`
      SELECT 
        rentals.*, games.name AS "gameName", games."categoryId" AS "gameCategoryId", 
        categories.name AS "gameCategoryName", 
        customers.name AS "customerName"
      FROM rentals
        JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id
        JOIN customers ON rentals."customerId" = customers.id
      ${filter && filter}
    `);

    const rentals = rentalsResult.rows.map(rental => {
      if (startDate) {
        const initialDate = new Date(startDate);
        const isValidDate = rental.rentDate.getTime() > initialDate.getTime();

        if (isValidDate) {
          return rentalFormatToSend(rental);
        } else {
          return 
        }
      }

      return rentalFormatToSend(rental);
    });
    
    return res.status(200).send(rentals);
  } catch (error){
    console.log(error)
    res.sendStatus(500);
  }
}

export async function finishRental(_req, res) {
  const { rental, rentalId } = res.locals;

  try {
    const rentDate = rental.rentDate;
    const returnDate = new Date();

    const gameResult = await connection.query(`
      SELECT * FROM games
      WHERE id = $1
    `, [rental.gameId]);  

    const { pricePerDay } = gameResult.rows[0];

    const oneDayInMiliseconds = 1000*60*60*24;
    const delayDays = parseInt((returnDate.getTime() - rentDate.getTime())/oneDayInMiliseconds);
    const delayFee = pricePerDay * delayDays;
    
    await connection.query(`
      UPDATE rentals 
      SET "returnDate" = $2, "delayFee" = $3
      WHERE id = $1 AND "returnDate" IS NULL
    `, [rentalId, returnDate, delayFee]);    

    return res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function deleteRental(_req, res) {
  const rentalId = res.locals.rentalId;

  try {
    await connection.query(`
    DELETE FROM rentals
    WHERE id = $1
  `, [rentalId]);
  
    return res.sendStatus(200);
  } catch (error){
    console.log(error)
    res.sendStatus(500);
  }
}