import { query } from "@config/db";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  const { imageId } = req.query;

  if (req.method === "DELETE") {
    try {
      const affectedRows = await query({
        query: "UPDATE `images` SET `statid` = 2 WHERE `id` = ?",
        values: [imageId],
      });

      if (affectedRows) {
        const image = await query({
          query: "SELECT * FROM `images` WHERE `id` = ?",
          values: [imageId],
        });

        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "hero",
          image[0].filename
        );

        res.status(200).json({
          response: {
            status: "success",
            message: "Successfully deleted.",
            data: { id: imageId },
          },
        });

        try {
          console.log(imagePath);
          fs.unlinkSync(imagePath);
        } catch (error) {
          res.status(200).json({
            response: {
              status: "error",
              message: `Error in deleting the file. ${imagePath} -`,
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
