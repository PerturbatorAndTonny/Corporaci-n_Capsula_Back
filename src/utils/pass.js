import bcrypt from "bcrypt";

export async function hashPass(password) {
  const salt = await bcrypt.genSalt(14);
  const passHash = await bcrypt.hash(password, salt);
  return passHash;
}

export async function comparePass(pass, hash) {
  const isMatch = await bcrypt.compare(pass, hash);
  return isMatch;
}