import multer from "multer";
import path from "path";
import nc from "next-connect";
import { query } from "@config/db";
import fs from "fs";

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
    const filename = path.basename(req.file.filename);
    try {
      const condominium = await query({
        query: "SELECT * FROM `condominiums` WHERE `id` = ?",
        values: [condominiumId],
      });

      if (condominium[0].amenities_filename) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "condominium",
          "amenities",
          condominium[0].amenities_filename
        );

        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          res.status(200).json({
            response: {
              status: "error",
              message: `Error in deleting the file. ${imagePath} -`,
            },
          });
        }
      }

      const updateCondominium = await query({
        query:
          "UPDATE `condominiums` SET `amenities_description` = ?,`amenities_list` = ?,`amenities_filename` = ?,`amenities_directory` = '/uploads/condominium/amenities/' WHERE `id` = ?",
        values: [
          amenities_description,
          amenities_list,
          filename,
          condominiumId,
        ],
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully updated.",
          data: updateCondominium,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating data." });
    }
  });

export default handler;
