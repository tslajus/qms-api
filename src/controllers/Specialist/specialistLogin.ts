import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Specialist } from "@/models";
import {
  verifyPassword,
  generateToken,
  errorHandler,
  constants,
} from "@/utils";

const specialistLogin = async (req: Request, res: Response) => {
  const { TEMP } = constants;
  const secret = process.env.JWT_SECRET || TEMP.SECRET_KEY;
  const lifetime = process.env.JWT_LIFETIME || TEMP.LIFETIME;

  try {
    const { username, password } = req.body;
    const specialist = await Specialist.findOne({ username });

    if (!specialist || !verifyPassword(password, specialist.password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken(specialist.id, secret, lifetime);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged in successfully",
      token,
      id: specialist._id,
      name: specialist.name,
    });
  } catch (error) {
    errorHandler(error, res, "Error logging in");
  }
};

export default specialistLogin;
