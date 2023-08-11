import multer from "multer";
import path from "path";
import nc from "next-connect";
import { query } from "@config/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(process.cwd(), "public", "uploads", "condominium", "main")
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname));
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
  .use(upload.single("main_image_file"))
  .post(async (req, res) => {
    const { name, main_description } = req.body;
    const filename = path.basename(req.file.filename);
    try {
      const condominium = await query({
        query:
          "INSERT INTO `condominiums` (`name`,`main_description`,`main_filename`,`main_directory`,`statid`) " +
          "VALUES (?,?,?,'/uploads/condominium/main/',6)",
        values: [name, main_description, filename],
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully created.",
          data: condominium,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating data." });
    }
  })
  .get(async (req, res) => {
    try {
      const condominiums = await query({
        query: "SELECT * FROM `condominiums` WHERE `statid` = 1",
        values: [],
      });
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominiums,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "System error." });
    }
  });

export default handler;
