import { query } from "@config/db";

export default async function handler(req, res) {
  const { condominiumId } = req.query;

  if (req.method === "GET") {
    const condominiums = await query({
      query: "SELECT * FROM `condominiums` WHERE `id` = ?",
      values: [condominiumId],
    });

    if (condominiums.length > 0) {
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: condominiums,
        },
      });
    } else {
      res.status(200).json({
        response: { status: "invalid", message: "Invalid details." },
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const affectedRows = await query({
        query: "UPDATE `condominiums` SET `statid` = 2 WHERE `id` = ?",
        values: [condominiumId],
      });

      if (affectedRows) {
        res.status(200).json({
          response: {
            status: "success",
            message: "Successfully deleted.",
          },
        });
      } else {
        res.status(200).json({
          response: {
            status: "invalid",
            message: "Data invalid.",
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting data." });
    }
  }

  if (req.method === "PATCH") {
    const { id, name, location, payable_to, description } = req.body;
    try {
      const affectedRows = await query({
        query:
          "UPDATE `condominiums` SET `name` = ?,`location` = ?,`payable_to` = ?,`description` = ? WHERE `id` = ?",
        values: [name, location, payable_to, description, id],
      });

      if (affectedRows) {
        const condominium = await query({
          query:
            "SELECT a.*,b.name as `payables_name` FROM `condominiums` as a LEFT JOIN `payables` as b ON a.`payable_to` = b.`id` WHERE a.id = ?",
          values: [id],
        });

        res.status(200).json({
          response: {
            status: "success",
            message: "Successfully updated.",
            data: condominium[0],
          },
        });
      } else {
        res.status(200).json({
          response: {
            status: "invalid",
            message: "Data invalid.",
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting data." });
    }
  }
}
