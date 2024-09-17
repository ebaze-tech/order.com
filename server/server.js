const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// <--- ROUTES --->

// <--- JSON MIDDLEWARE --->
app.use(express.json());

// <--- MIDDLEWARE TO PARSE URL-ENCODED BODIES --->
app.use(
  express.urlencoded({
    extended: true,
  })
);

// <--- CORS CONFIGURATION --->
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// <--- PASSPORT MIDDLEWARE --->
app.use(passport.initialize());
app.use(passport.session());

// <--- ROUTES --->

// <--- DEFAULT BACKEND ROUTE "/"
app.get("/", (req, res) => {
  console.log("This is the AP!");
});

// <--- DB CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Server running on port $PORT`");
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  });
