import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const condominiums = await query({
      query: "SELECT * FROM `condominiums` WHERE `statid` = 1",
      values: [],
    });

    res.status(200).json({
      response: { status: "success", data: condominiums },
    });
  }

  if (req.method === "POST") {
    try {
      const { name, location, payable_to, description } = req.body;

      const newCondominium = await query({
        query:
          "INSERT INTO `condominiums` (`name`,`location`,`payable_to`,`description`) VALUES (?,?,?,?)",
        values: [name, location, payable_to, description],
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully added.",
          data: newCondominium,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating data." });
    }
  }
}
