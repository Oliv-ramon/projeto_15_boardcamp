import connection from "../db.js";

export async function createGame(req, res) {
  const game = req.body;
  game.stockTotal = Number(game.stockTotal);
  game.pricePerDay = Number(game.pricePerDay);

  try {
    await connection.query(`
      INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1, $2, $3, $4, $5)
    `, Object.values(game));
    
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}   

export async function getGames(req, res) {
  const { name } = req.query;
  
  let filter = "";
  if (name) {
    filter = `WHERE name ILIKE '${name}%'`;
  }

  try {
    const query =  await connection.query(`
      SELECT * FROM games
      ${filter && filter}
    `);

    const games = query.rows;
    
    return res.status(200).send(games);
  } catch (error){
    console.log(error)
    res.sendStatus(500);
  }
}