const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");

const app = express();

// <--- MIDDLEWARE SETUP --->

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JSON middleware
app.use(express.json());

// URL-encoded bodies middleware
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Session middleware configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Set to true in production if using HTTPS
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// <--- ROUTES --->
const AccountApiRoutes = require("./routes/accounts/accounts")
/*const OrderApiRoutes = require("./routes/order")
const PaymentApiRoutes = require("./routes/payment/")
const ProductDeliveryApiRoutes = require("./routes/productDelivery/productDelivery")
const ProductManagementApiRoutes = require("./routes/productManagement")
const RefundApiRoutes = require("./routes/refund")*/
app.use("/api", AccountApiRoutes)
// Default backend route "/"
app.get("/", (req, res) => {
  res.send("This is the API!");
});

// <--- DB CONNECTION & SERVER START --->

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  });
