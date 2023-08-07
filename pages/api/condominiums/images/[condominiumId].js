import { query } from "@config/db";

export default async function handler(req, res) {
  const { condominiumId } = req.query;

  if (req.method === "GET") {
    const condominiumImages = await query({
      query:
        "SELECT * FROM `images` WHERE `directory` = 'condominium' AND `directoryId` = ? AND `statid` = 1",
      values: [condominiumId],
    });

    if (condominiumImages.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominiumImages,
        },
      });
    } else {
      res.status(200).json({
        response: { status: condominiumId, message: "Invalid details." },
      });
    }
  }
}
