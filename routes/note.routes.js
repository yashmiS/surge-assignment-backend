const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const Note = require("../models/note");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post("/add", async (req, res) => {
    console.log("workong");
    const note = new Note(req.body);

    console.log(note);

    try {
      await note.save();
      res.send(note);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.get("/allnotes", (req, res) => {
    Note.find({}, (err, notes) => {
      var noteMap = [];

      notes.forEach((note) => {
        noteMap.push(note);
      });

      res.send(noteMap);
    });
  });
};
