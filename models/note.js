const mongoose = require("mongoose");
const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    title: String,
    description: String,
  })
);
module.exports = Note;
