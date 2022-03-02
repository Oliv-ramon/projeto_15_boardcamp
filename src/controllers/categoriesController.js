import connection from "../db.js";

export default async function createCategory(req, res) {
  const category = req.body;

  try {
    const query =  await connection.query(`
      INSERT INTO categories (name) VALUES ($1)
    `, [category.name]);

    console.log(query);
    
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}