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
  .patch(async (req, res) => {
    const { condominiumId } = req.query;
    const { name, main_description } = req.body;

    try {
      const condominium = await query({
        query: "SELECT * FROM `condominiums` WHERE `id` = ?",
        values: [condominiumId],
      });

      const filename = req.file
        ? path.basename(req.file.filename)
        : condominium[0].main_filename;

      if (req.file && condominium[0].main_filename) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "condominium",
          "main",
          condominium[0].main_filename
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
          "UPDATE `condominiums` SET `name` = ?,`main_description` = ?,`main_filename` = ?,`main_directory` = '/uploads/condominium/main/' WHERE `id` = ?",
        values: [name, main_description, filename, condominiumId],
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
