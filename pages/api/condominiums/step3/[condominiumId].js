import multer from "multer";
import path from "path";
import nc from "next-connect";
import fs from "fs";
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
      path.join(process.cwd(), "public", "uploads", "condominium", "amenities")
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
  .use(upload.single("amenities_image_file"))
  .patch(async (req, res) => {
    const { condominiumId } = req.query;
    const { amenities_description, amenities_list } = req.body;
    try {
      await connectMongoDB();
      const condominium = await Condominium.findById(condominiumId);

      const filename = req.file
        ? path.basename(req.file.filename)
        : condominium.amenities_filename;

      if (req.file && condominium.amenities_filename) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "condominium",
          "amenities",
          condominium.amenities_filename
        );

        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          res.status(200).json({
            response: {
              status: "error",
              message: `Error in deleting the file.`,
            },
          });
        }
      }

      const updatedCondiminium = await Condominium.findByIdAndUpdate(
        condominiumId,
        {
          amenities_description: amenities_description,
          amenities_list: amenities_list,
          amenities_filename: filename,
          amenities_directory: "/uploads/condominium/amenities/",
        },
        {
          returnDocument: "after",
        }
      );

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully updated.",
          data: updatedCondiminium,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: "Error creating data." });
    }
  });

export default handler;
