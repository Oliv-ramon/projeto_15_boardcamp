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
}   

export async function updateCustomer(req, res) {
  const customer = req.body;

  try {
    await connection.query(`
      UPDATE customers SET 
        name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4
      WHERE id = $5
    `, [...Object.values(customer), req.params.id]);
    
    return res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}  

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  
  let filter = "";
  if (cpf) {
    filter = `WHERE cpf ILIKE '${cpf}%'`;
  }


  try {
    const query =  await connection.query(`
      SELECT * FROM customers
      ${filter && filter}
      `);

    const customers = query.rows.map(customer => {
      customer.birthday = customer.birthday.toISOString().split("T")[0];
      return customer;
    });

    return res.status(200).send(customers);
  } catch {
    res.sendStatus(500);
  }
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
}