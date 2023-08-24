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
      path.join(process.cwd(), "public", "uploads", "condominium", "thumbnail")
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
  .use(upload.single("thumbnail_image_file"))
  .patch(async (req, res) => {
    const { condominiumId } = req.query;
    const { thumbnail_description } = req.body;

    try {
      const condominium = await query({
        query: "SELECT * FROM `condominiums` WHERE `id` = ?",
        values: [condominiumId],
      });

      const filename = req.file
        ? path.basename(req.file.filename)
        : condominium[0].thumbnail_filename;

      if (req.file && condominium[0].thumbnail_filename) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "condominium",
          "thumbnail",
          condominium[0].thumbnail_filename
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

      await query({
        query:
          "UPDATE `condominiums` SET `thumbnail_description` = ?,`thumbnail_filename` = ?,`thumbnail_directory` = '/uploads/condominium/thumbnail/' WHERE `id` = ?",
        values: [thumbnail_description, filename, condominiumId],
      });

      const updateCondominium = await query({
        query: "SELECT * FROM `condominiums` WHERE `id` = ?",
        values: [condominiumId],
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully updated.",
          data: updateCondominium[0],
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating data." });
    }
  });

export default handler;
