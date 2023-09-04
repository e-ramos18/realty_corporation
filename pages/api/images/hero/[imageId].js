import path from "path";
import fs from "fs";
import connectMongoDB from "@config/mongodb";
import Image from "@models/image";

export default async function handler(req, res) {
  const { imageId } = req.query;

  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      const deletedRows = await Image.findByIdAndDelete(imageId);

      if (deletedRows) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "hero",
          deletedRows.filename
        );

        res.status(200).json({
          response: {
            status: "success",
            message: "Successfully deleted.",
          },
        });

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
      } else {
        res.status(200).json({
          response: {
            status: "invalid",
            message: "Data invalid.",
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting data." });
    }
  }
}
