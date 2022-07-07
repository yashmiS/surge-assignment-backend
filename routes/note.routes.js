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

      console.log(noteMap);

      res.send(JSON.stringify(noteMap));
    });
  });

  // app.post("/update", async (req, res) => {
  //   try {
  //     const note = req.body;

  //     const filter = { title: note.title };
  //     const update = note;

  //     let doc = await Note.findOneAndUpdate(filter, update, {
  //       new: true,
  //     });

  //     res.send(doc);
  //   } catch (error) {
  //     res.status(500).send(JSON.stringify({ message: error.message }));
  //   }
  // });

  app.post("/delete", async (req, res) => {
    try {
      const { title } = req.body;

      const filter = { title: title };

      let doc = await Note.findOneAndDelete(filter);

      res.send(doc);
    } catch (error) {
      res.status(500).send(JSON.stringify({ message: error.message }));
    }
  });
};
