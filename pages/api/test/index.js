export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      response: { status: "success", data: "test api" },
    });
  } else {
    res.status(405).json({
      response: { status: "error", message: "Error System Method" },
    });
  }
}
