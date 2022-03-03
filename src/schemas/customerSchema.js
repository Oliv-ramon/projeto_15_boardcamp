import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().min(1).required(),
  phone: joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
  cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
  birthday: joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).required(),
});

export default customerSchema;