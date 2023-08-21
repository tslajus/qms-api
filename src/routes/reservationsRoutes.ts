import express from "express";
import {
  reserveVisit,
  viewTimeLeft,
  cancelVisit,
} from "@/controllers/Reservations";
import { checkReservationCode } from "@/middleware";

const router = express.Router();

router.post("/reserve", reserveVisit);
router.get("/time-left/:reservationCode", checkReservationCode, viewTimeLeft);
router.patch("/cancel/:reservationCode", checkReservationCode, cancelVisit);

export default router;
