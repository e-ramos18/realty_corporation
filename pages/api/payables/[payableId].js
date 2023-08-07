import { query } from "@config/db";

export default async function handler(req, res) {
  const { payableId } = req.query;

  if (req.method === "GET") {
    const payables = await query({
      query: "SELECT * FROM `payables` WHERE `id` = ?",
      values: [payableId],
    });

    if (payables.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: payables,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }
}
