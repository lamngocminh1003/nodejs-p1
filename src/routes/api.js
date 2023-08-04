const express = require("express");
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/apiController";
let router = express.Router();
const initAPIRoute = (app) => {
  router.get("/users", getAllUsers);
  router.post("/create-user", createUser);
  router.put("/update-user", updateUser);
  router.delete("/delete-user/:userId", deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
