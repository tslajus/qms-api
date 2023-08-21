import express from "express";
import { getVisits } from "@/controllers/DisplayBoard";

const router = express.Router();

router.get("/visits", getVisits);

export default router;
