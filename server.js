const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const db = require("./models");

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "surge_assignment",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to surge application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;
db.mongoose
  .connect(
    `mongodb+srv://surge-assignment:kkhMgQRys3PHRHqq@cluster0.ojk48kk.mongodb.net/userdb?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "student",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'student' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/note.routes")(app);
require("./routes/userd.routes")(app);
