import connectMongoDB from "@config/mongodb";
import User from "@models/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectMongoDB();
    const user = await User.find();

    res.status(200).json({
      response: { status: "success", data: user },
    });
  } else {
    res.status(405).json({
      response: { status: "error", message: "Error System Method" },
    });
  }
}
