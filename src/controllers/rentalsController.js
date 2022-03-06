import connection from "../db.js";

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
  const { customerId, gameId } = req.query;
  
  let filter = "";
  if (customerId) {
    filter = `WHERE "customerId" = ${customerId}`;
  }
  if (gameId) {
    filter = `WHERE "gameId" = ${gameId}`;
  }

  try {
    const rentalsResult = await connection.query(`
      SELECT rentals.*, games.name AS "gameName", games."categoryId" AS "gameCategoryId", categories.name AS "gameCategoryName", customers.name AS "customerName"
      FROM rentals
        JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id
        JOIN customers ON rentals."customerId" = customers.id
      ${customerId || gameId ? filter : ""}
    `);

    const rentals = rentalsResult.rows.map(rental => {
      const rentDate = rental.rentDate.toISOString().split("T")[0];

      return ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
          id: rental.customerId,
          name: rental.customerName
        },
        game: {
          id: rental.gameId,
          name: rental.gameName
        }
      })
    });
  
    return res.status(200).send(rentals);
  } catch {
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

    const delayDays = parseInt((returnDate.getTime() - rentDate.getTime())/(1000*60*60*24));
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