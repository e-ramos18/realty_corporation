import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const unitTypes = await query({
      query: "SELECT * FROM `unit_types` WHERE `statid` = 1",
      values: [],
    });

    res.status(200).json({
      response: { status: "success", unitTypes: unitTypes },
    });
  }
}
