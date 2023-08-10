import multer from "multer";
import path from "path";
import nc from "next-connect";
import { query } from "@config/db";

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
      const heroImage = await query({
        query:
          "INSERT INTO `images` (`directory`,`directoryId`,`location`,`filename`) VALUES ('hero',1,'/uploads/hero/',?)",
        values: [filename],
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
      const heroImages = await query({
        query:
          "SELECT * FROM `images` WHERE `directory` = 'hero' AND `statid` = 1",
        values: [],
      });
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
