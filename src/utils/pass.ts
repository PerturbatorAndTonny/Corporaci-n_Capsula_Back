import bcrypt from "bcrypt";

export async function hashPass(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(14);
  const passHash = await bcrypt.hash(password, salt);
  return passHash;
}

export async function comparePass(pass: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(pass, hash);
  return isMatch;
}