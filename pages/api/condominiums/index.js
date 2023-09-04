import multer from "multer";
import path from "path";
import nc from "next-connect";
import connectMongoDB from "@config/mongodb";
import Condominium from "@models/condominium";

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
      await connectMongoDB();
      const condominium = await Condominium.create({
        name: name,
        main_description: main_description,
        main_filename: filename,
        main_directory: "/uploads/condominium/main/",
        status: "pending",
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
      await connectMongoDB();
      const condominiums = await Condominium.find({ status: "complete" });
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
