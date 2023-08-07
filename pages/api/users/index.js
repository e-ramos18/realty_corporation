import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await query({
      query: "SELECT * FROM `users` WHERE `statid` = 1",
      values: [],
    });

    res.status(200).json({
      response: { status: "success", users: users },
    });
  }
}
