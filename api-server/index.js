const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

const multer_storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb("Upload image file", false);
};

const upload = multer({
  storage: multer_storage,
  fileFilter: filter,
});

const resizeImage = async (req, res, next) => {
  const id = uuidv4();
  console.log(req.file);
  const { width, height, quality, format } = req.params;
  try {
    req.file.filename = `resize-image-${id}`;
    const img = sharp(req.file.buffer).resize(
      parseFloat(width),
      parseFloat(height)
    );
    if (format === "jpeg") {
      await img
        .toFormat("jpeg")
        .jpeg({ quality: parseInt(quality) })
        .toFile(`./upload_pic/${req.file.filename}`);
    }
    if (format === "png") {
      await img
        .toFormat("png")
        .png({ quality: parseInt(quality) })
        .toFile(`./upload_pic/${req.file.filename}`);
    }

    req.name = req.file.filename;
    next();
  } catch (err) {
    res.json({ status: "Error : image is not processed" });
    console.log(err);
  }
};
const download = (req, res) => {
  res.download(`./upload_pic/${req.name}`);
};

app.post(
  "/imageResize/:width/:height/:format/:quality",
  upload.single("photo"),
  resizeImage,
  download
);
// process.env.PORT
app.listen(process.env.PORT, () => console.log("server running.."));
