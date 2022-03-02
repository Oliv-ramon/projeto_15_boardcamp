import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string().required(),
  stockTotal: joi.string().min(1).required(),
  categoryId: joi.number().integer().positive().required(),
  pricePerDay: joi.string().min(1).required(),
});

export default gameSchema;