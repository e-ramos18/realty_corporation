import connectMongoDB from "@config/mongodb";
import User from "@models/user";
import jwt from "jsonwebtoken";
import md5 from "md5";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uname, pword } = req.body;
    await connectMongoDB();

    const user = await User.find({ uname: uname, pword: md5(pword) });

    if (user.length > 0) {
      const secretKey = process.env.SECRET_KEY;
      res.status(200).json({
        response: {
          status: "success",
          message: "Data found.",
          data: user,
          token: jwt.sign({ username: uname, admin: true }, secretKey),
        },
      });
    } else {
      res.status(200).json({
        response: { status: "error", message: "Invalid credentials." },
      });
    }
  }
}
