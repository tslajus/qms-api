import "module-alias/register";
import dotenv from "dotenv";
import express, { Express } from "express";

import reservationRoutes from "./routes/reservationsRoutes";
import specialistRoutes from "./routes/specialistsRoutes";
import displayBoardRoutes from "./routes/displayBoardRoutes";
import { healthCheck } from "./controllers/healthCheck";

import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./db/connectDB";
import { constants, startSpecialistStatusUpdates } from "./utils";

dotenv.config();

const app: Express = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());

app.get("/api/v1/health", healthCheck);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/specialists", specialistRoutes);
app.use("/api/v1/display-board", displayBoardRoutes);

const { TEMP } = constants;
const PORT: string | number = process.env.PORT || TEMP.PORT;
const DB: string = process.env.MONGO_URL || TEMP.DB;

startSpecialistStatusUpdates();

const start = async (): Promise<void> => {
  try {
    await connectDB(DB);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
