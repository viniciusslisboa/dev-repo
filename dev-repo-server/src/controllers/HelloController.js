import User from "../models/User";

class HelloController {
  async index(req, res) {
    const id = req.userId;
    return res.json({ id });
  }
}

export default new HelloController();
