const express = require("express");
import {
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
} from "../controllers/homeController";
var appRoot = require("app-root-path");
const multer = require("multer");
let router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/imgs");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array(
  "mul-img",
  3
);

const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/detail-user/:userId", getDetailUser);
  router.get("/create-user", getCreateUserPage);
  router.post("/create", postCreateUser);
  router.get("/update-user/:userId", getUpdateUserPage);
  router.post("/update", postUpdateUser);
  router.post("/delete", postDeleteUser);
  router.get("/upload-imgs", getUploadImagePage);
  router.post("/upload", upload.single("img", 3), postUploadImage);
  router.post(
    "/upload-multiple",
    (req, res, next) => {
      upload1(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    postUploadMultipleImages
  );
  return app.use("/", router);
};

module.exports = initWebRoute;
