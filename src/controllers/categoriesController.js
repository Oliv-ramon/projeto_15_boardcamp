import connection from "../db.js";

export async function createCategory(req, res) {
  const category = req.body;

  try {
    await connection.query(`
      INSERT INTO categories (name) VALUES ($1)
    `, [category.name]);
    
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function getCategories(_req, res) {
  try {
    const query =  await connection.query(`
      SELECT * FROM categories`);

    const categories = query.rows;
    
    return res.status(200).send(categories);
  } catch {
    res.sendStatus(500);
  }
}