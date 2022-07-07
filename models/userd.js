const mongoose = require("mongoose");
const Userd = mongoose.model(
  "Userd",
  new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    mobile: Number,
    status: Boolean,
    password: String,
    accountType: String,
  })
);
module.exports = Userd;
