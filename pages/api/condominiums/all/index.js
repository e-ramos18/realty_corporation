import connectMongoDB from "@config/mongodb";
import Condominium from "@models/condominium";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectMongoDB();
    const condominiums = await Condominium.find();

    if (condominiums.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominiums,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details.", data: [] },
      });
    }
  }
}
