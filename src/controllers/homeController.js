import connection from "../configs/connectDB";
import { getDetailUserService } from "../services/CRUDService";
const multer = require("multer");

let getHomePage = async (req, res) => {
  //c2 xài promises
  const [rows, fields] = await connection.execute("SELECT * FROM `users`");
  return res.render("index", { data: rows });
};
let getDetailUser = async (req, res) => {
  let userId = req.params.userId;
  let data = await getDetailUserService(userId);
  return res.render("detailUser", { data: data });
};
let getCreateUserPage = async (req, res) => {
  return res.render("createUser");
};
let postCreateUser = async (req, res) => {
  let { lastName, firstName, email, address } = req.body;
  console.log("check ", lastName, firstName, email, address);
  await connection.execute(
    "INSERT INTO users (lastName, firstName, email, address) VALUES (?,?,?,?);",
    [lastName, firstName, email, address]
  );
  return res.redirect("/");
};
let getUpdateUserPage = async (req, res) => {
  let userId = req.params.userId;
  let data = await getDetailUserService(userId);
  return res.render("updateUser", { data: data });
};
let postUpdateUser = async (req, res) => {
  let { userId, lastName, firstName, email, address } = req.body;
  await connection.execute(
    "UPDATE users SET lastName=?, firstName=?, email=?, address=? WHERE userId =? ;",
    [lastName, firstName, email, address, userId]
  );
  return res.redirect("/");
};
let postDeleteUser = async (req, res) => {
  let { userId } = req.body;
  await connection.execute("DELETE FROM users WHERE userId =? ;", [userId]);
  return res.redirect("/");
};
let getUploadImagePage = async (req, res) => {
  return res.render("uploadImage");
};
let postUploadImage = async (req, res) => {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/imgs/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`
  );
};

let postUploadMultipleImages = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/imgs/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload-success">Upload more images</a>';
  res.send(result);
};
module.exports = {
  getHomePage,
  getDetailUser,
  getCreateUserPage,
  postCreateUser,
  getUpdateUserPage,
  postUpdateUser,
  postDeleteUser,
  getUploadImagePage,
  postUploadImage,
  postUploadMultipleImages,
};
