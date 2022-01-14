import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token was not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
  }
};
