const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catalogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true
    }
  }
  )

  const orderSchema = new Schema(
    {
      buyer: {
        type: String,
        required: true
      },
      order: [catalogSchema]
    }
  )


const registerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    type: {
        type: String,
        required: true,
        minlength: 5,
    },
    catalog: [catalogSchema],
    orders: [orderSchema],
    password: {
        type: String,
        required: true,
        minlength: 5,
    }
  }
);

module.exports = mongoose.model('register', registerSchema)