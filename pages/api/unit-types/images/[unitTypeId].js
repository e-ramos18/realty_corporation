import { query } from "@config/db";

export default async function handler(req, res) {
  const { unitTypeId } = req.query;

  if (req.method === "GET") {
    const unitTypeImages = await query({
      query:
        "SELECT * FROM `images` WHERE `directory` = 'unit_type' AND `directoryId` = ? AND `statid` = 1",
      values: [unitTypeId],
    });

    if (unitTypeImages.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: unitTypeImages,
        },
      });
    } else {
      res.status(200).json({
        response: { status: unitTypeId, message: "Invalid details." },
      });
    }
  }
}
