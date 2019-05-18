const mongoose = require("mongoose");
const generateToken = require("../helpers/generateRandomToken");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    studentId: {
      type: String,
      required: true,
      default: generateToken(16)
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    usn: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);
