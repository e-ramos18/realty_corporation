import { query } from "@config/db";

export default async function handler(req, res) {
  const { condominiumId } = req.query;

  if (req.method === "GET") {
    const condominiumUnitTypes = await query({
      query:
        "SELECT * FROM `unit_types` WHERE `directory` = 'condominium' AND `directoryId` ? AND `statid` = 1",
      values: [condominiumId],
    });

    if (condominiumUnitTypes.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominiumUnitTypes,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }
}
