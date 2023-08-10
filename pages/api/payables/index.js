import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const payables = await query({
      query: "SELECT * FROM `payables` WHERE `statid` = 1",
      values: [],
    });

    res.status(200).json({
      response: { status: "success", data: payables },
    });
  }
}
