const mongoose = require("mongoose");
const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    title: String,
    Description: String,
  })
);
module.exports = Note;
