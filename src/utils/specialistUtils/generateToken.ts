import jwt from "jsonwebtoken";

const generateToken = (id: string, secret: string, lifetime: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: lifetime,
  });
};

export default generateToken;
