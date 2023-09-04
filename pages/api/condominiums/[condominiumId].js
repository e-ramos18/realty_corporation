import path from "path";
import fs from "fs";
import connectMongoDB from "@config/mongodb";
import Condominium from "@models/condominium";

export default async function handler(req, res) {
  const { condominiumId } = req.query;

  if (req.method === "GET") {
    await connectMongoDB();
    const condominium = await Condominium.findById(condominiumId);

    if (condominium) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominium,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      const deletedRow = await Condominium.findByIdAndDelete(condominiumId);

      if (deletedRow) {
        //delete main file
        if (deletedRow.main_filename) {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "condominium",
            "main",
            deletedRow.main_filename
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

        //delete thumbnail file
        if (deletedRow.thumbnail_filename) {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "condominium",
            "thumbnail",
            deletedRow.thumbnail_filename
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

        //delete amenities file
        if (deletedRow.amenities_filename) {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "condominium",
            "amenities",
            deletedRow.amenities_filename
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

        //delete location file
        if (deletedRow.location_filename) {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "condominium",
            "location",
            deletedRow.location_filename
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

        res.status(200).json({
          response: {
            status: "success",
            message: "Successfully deleted.",
          },
        });
      } else {
        res.status(200).json({
          response: {
            status: "invalid",
            message: "Data invalid.",
          },
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Error deleting data." });
    }
  }
}
