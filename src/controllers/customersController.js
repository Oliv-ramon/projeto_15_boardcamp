import connection from "../db.js";

export async function createCustomer(req, res) {
  const customer = req.body;

  try {
    await connection.query(`
      INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)
    `, Object.values(customer));
    
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }

  res.sendStatus(200)
}   

export async function getCustomers(_req, res) {
  try {
    const query =  await connection.query(`
      SELECT * FROM customers`);

    const customers = query.rows;
    
    return res.status(200).send(customers);
  } catch {
    res.sendStatus(500);
  }
  res.sendStatus(200)
}

export async function getCustomerById(req, res) {
  try {
    const query =  await connection.query(`
      SELECT * FROM customers
      WHERE id = $1
      `, [req.params.id]);

    const customer = query.rows[0];

    if (!customer) {
      return res.sendStatus(404);
    }
    
    return res.status(200).send(customer);
  } catch {
    res.sendStatus(500);
  }
  res.sendStatus(200)
}