import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const healthCheck = async (req: Request, res: Response) => {
  try {
    const response = {
      success: true,
      message: "Server is awake",
    };

    console.log("Server is awake and responding to health check.");
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    const response = {
      success: false,
      message: "Server health check failed",
    };

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};
