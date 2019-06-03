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
    emailVerified: {
      type: Boolean,
      default: false
    },
    studentId: {
      type: String,
      index: true,
      default: generateToken(16)
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    usn: {
      type: String,
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 0
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true
  }
);

studentSchema.methods.updateBalance = async function(newBalance) {
  if (newBalance <= 0) {
    throw new Error("Invalid balance amount.");
  }
  this.balance = Number(newBalance);
  await this.save();
};

module.exports = mongoose.model("Student", studentSchema);
