import crypto from "crypto";

const verifyPassword = (password: string, original: string): boolean => {
  const [salt, originalHash] = original.split("$");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === originalHash;
};

export default verifyPassword;
