const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./src/middlewares/errorHandler.js');
const SharedRoute = require("./src/routes/SharedRoutes.js");

const app = express();
//dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //If you’re handling form submissions (like from HTML forms), add this too:
app.use(errorHandler);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs(15 minutes)
});
app.use(limiter);


console.log("process.env.PORT :", process.env.PORT);

app.get("/api/", (req, res) => {
  res.json({ message: "This is data from the server." });
});

app.get('/testerrorhandler', (req, res) => {
  throw new Error('Something went wrong!');
});


app.use("/api/Shared", SharedRoute);




app.use(errorHandler);  // ✅ Must come AFTER all routes

app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
