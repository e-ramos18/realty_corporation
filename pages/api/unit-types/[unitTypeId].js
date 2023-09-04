import { query } from "@config/db";

export default async function handler(req, res) {
  const { unitTypeId } = req.query;

  if (req.method === "GET") {
    const unitTypes = await query({
      query: "SELECT * FROM `unit_types` WHERE `id` = ?",
      values: [unitTypeId],
    });

    if (unitTypes.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: unitTypes,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }
}
