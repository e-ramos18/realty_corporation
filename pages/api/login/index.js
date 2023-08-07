import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uname, pword } = req.body;

    const users = await query({
      query:
        "SELECT * FROM `users` WHERE `uname` = ? AND `pword` = md5(?) AND `statid` = 1",
      values: [uname, pword],
    });

    if (users.length > 0) {
      res.status(200).json({
        response: { status: "success", message: "Data found.", data: users },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid credentials." },
      });
    }
  }
}
