import jwt from "jsonwebtoken";

import User from "../models/User";
import { checkPassword } from "../services/auth";
import auth from "../config/auth";

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "email or password invalid." });
      }

      if (!checkPassword(user, password)) {
        return res.status(401).json({ message: "email or password invalid." });
      }

      const { id } = user;

      return res.json({
        user: {
          id,
          email,
        },
        token: jwt.sign({ id }, auth.secret, {
          expiresIn: auth.expiresIn,
        }),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }
}

export default new SessionController();
