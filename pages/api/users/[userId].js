import { query } from "@config/db";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === "GET") {
    const users = await query({
      query: "SELECT * FROM `users` WHERE `id` = ?",
      values: [userId],
    });

    if (users.length > 0) {
      res.status(200).json({
        response: { status: "success", message: "Data found.", data: users },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }
}
