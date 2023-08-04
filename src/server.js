import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import initWebRoute from "./routes/web";
import initAPIRoute from "./routes/api";
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
app.use((req, res, next) => {
  console.log("run into my middleware method");
  console.log(req.method);
  next();
});
app.use(morgan("combined"));

// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render("404");
});

//init api route
initAPIRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
