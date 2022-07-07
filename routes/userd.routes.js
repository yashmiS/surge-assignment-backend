const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const Userd = require("../models/userd");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post("/userd/add", async (req, res) => {
    console.log("workong");
    const userd = new Userd(req.body);

    console.log(userd);

    try {
      await userd.save();
      res.send(userd);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.get("/allusers", (req, res) => {
    Userd.find({}, (err, userds) => {
      var userdMap = [];

      userds.forEach((userd) => {
        userdMap.push(userd);
      });

      res.send(userdMap);
    });
  });
};
