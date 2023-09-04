import multer from "multer";
import path from "path";
import nc from "next-connect";
import connectMongoDB from "@config/mongodb";
import Image from "@models/image";

export const config = {
  api: {
    bodyParser: false,
  },
};

const dateNow = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "uploads", "hero"));
  },
  filename: function (req, file, cb) {
    cb(null, dateNow + "-" + path.basename(file.originalname));
  },
});

const upload = multer({ storage: storage });

const handler = nc({
  onError: (err, req, res, next) => {
    res.status(500).json({
      response: { status: "error", message: "Something went wrong." },
    });
  },
})
  .use(upload.single("file-image"))
  .post(async (req, res) => {
    const filename = dateNow + "-" + path.basename(req.file.originalname);
    try {
      await connectMongoDB();
      const heroImage = await Image.create({
        directory: "hero",
        location: "/uploads/hero/",
        filename: filename,
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "File uploaded.",
          data: heroImage,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating data." });
    }
  })
  .get(async (req, res) => {
    try {
      await connectMongoDB();
      const heroImages = await Image.find({ directory: "hero" });
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: heroImages,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "System error." });
    }
  });

export default handler;
