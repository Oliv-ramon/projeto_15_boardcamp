import joi from "joi";

const rentalSchema = joi.object({
  customerId: joi.number().min(1).required(),
  gameId: joi.number().min(1).required(),
  daysRented: joi.number().min(1).required()
});

export function rentalFormatToSend(rental) {

  function cleanDate(date) {
    if (date === null) return date;

    return date.toISOString().split("T")[0];
  }

  return ({
    id: rental.id,
    customerId: rental.customerId,
    gameId: rental.gameId,
    rentDate: cleanDate(rental.rentDate),
    daysRented: rental.daysRented,
    returnDate: cleanDate(rental.returnDate),
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
}

export default rentalSchema;