import bcrypt from "bcryptjs";

export const createPasswordHash = async (passoword) => {
  const hash = await bcrypt.hash(passoword, 10);
  return hash;
};

export const checkPassword = async (user, password) => {
  const check = await bcrypt.compare(password, user.password);
  return check;
};
