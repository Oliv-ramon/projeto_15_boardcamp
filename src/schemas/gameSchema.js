import joi from "joi";
import connection from "../db.js";

const query = await connection.query(`SELECT categories.id FROM categories`);

const validsCategoryIds = query.rows.join(", ");

console.log(validsCategoryIds)

const gameSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string().required(),
  stockTotal: joi.string().min(1).required(),
  categoryId: joi.valid(validsCategoryIds),
  pricePerDay: joi.string().min(1).required(),
});

export default gameSchema;