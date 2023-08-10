import { query } from "@config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const condominiums = await query({
      query:
        "SELECT a.*,b.name as `payables_name` FROM `condominiums` as a LEFT JOIN `payables` as b ON a.`payable_to` = b.`id` WHERE a.`statid` = 1 ",
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

      const condominium = await query({
        query:
          "SELECT a.*,b.name as `payables_name` FROM `condominiums` as a LEFT JOIN `payables` as b ON a.`payable_to` = b.`id` WHERE a.id = ?",
        values: [newCondominium.insertId],
      });

      res.status(200).json({
        response: {
          status: "success",
          message: "Successfully added.",
          data: condominium[0],
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating data." });
    }
  }
}
