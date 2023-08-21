import express from "express";
import {
  specialistLogin,
  fetchPatients,
  fetchSpecialists,
  markVisitStatus,
  selectOutOfOrderVisit,
} from "@/controllers/Specialist";
import { authenticate } from "@/middleware";

const router = express.Router();

router.post("/login", specialistLogin);
router.get("/:id/patients", authenticate, fetchPatients);
router.get("/info", fetchSpecialists);
router.patch("/mark-visit/:reservationCode", authenticate, markVisitStatus);
router.patch("/:id/select-visit", authenticate, selectOutOfOrderVisit);

export default router;
