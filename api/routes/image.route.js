import controller from "../controllers/image.controller";

var express = require("express");
var router = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
  destination: "./api/public/images",
  filename: function (req, file, cb) {
    const name = Date.now() + `.${file.mimetype.split("/")[1]}`;
    cb(null, name);
  },
});
var upload = multer({ storage });

//Upload file
router.post("/", upload.single("image"), controller.upload);

//Get all public images
router.get("/public", controller.getPublicImages);

//Get user images
router.get("/my", controller.getPrivateImages);

//Delete image
router.delete("/:imageId", controller.deleteImage);

export default router;
