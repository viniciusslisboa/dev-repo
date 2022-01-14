require("dotenv/config");

export default {
  secret: process.env.PRIVATE_KEY,
  expiresIn: "7d",
};
