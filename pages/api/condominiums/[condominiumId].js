import { query } from "@config/db";

export default async function handler(req, res) {
  const { condominiumId } = req.query;

  if (req.method === "GET") {
    const condominiums = await query({
      query: "SELECT * FROM `condominiums` WHERE `id` = ?",
      values: [condominiumId],
    });

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
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }
}
