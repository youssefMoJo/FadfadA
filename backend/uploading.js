const express = require("express");
const router = new express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}_${file.originalname}`);
    cb(null, file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|MP4)$/)
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter }).single(
  "file"
);

router.post("/upload/imageOrVideo", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.json({ success: false, err });
    }
    // setTimeout(function () {
    return res.json({ success: true, url: res.req.file.path });
    // }, 3000);
  });
});

module.exports = router;
