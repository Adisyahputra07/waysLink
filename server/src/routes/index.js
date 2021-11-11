const express = require("express");
const { auth } = require("../middlewares/auth");
// const { uploadFile } = require("../middlewares/uploadFile");
const router = express.Router();

// multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});
const uploads = multer({ storage });

//Controller
const { getLink, deleteLink, getMyLinks } = require("../controllers/link");
const { addBrandLink, getBrand, updateVisitBrand } = require("../controllers/brand");
const { getUser, updateUser, deleteUser } = require("../controllers/user");
const { login, register } = require("../controllers/auth");

// routing user
router.post("/login", login);
router.post("/register", register);
router.get("/profile", auth, getUser);
router.patch("/profile", auth, updateUser);
router.delete("/user", auth, deleteUser);

// routing link
router.get("/link/:id", auth, getLink);
router.delete("/link/:id", auth, deleteLink);
router.get("/mylinks", auth, getMyLinks);

// routing brand
router.post("/addbrandlink", auth, uploads.any("files"), addBrandLink);
router.get("/brand/:id", auth, getBrand);
router.patch("/brand/:id", auth, updateVisitBrand);

module.exports = router;
