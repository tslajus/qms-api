import mongoose, { Document, Schema } from "mongoose";
import { ISpecialist } from "@/types";

const specialistSchema = new Schema<ISpecialist>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cabinetNumber: {
    type: Number,
    required: true,
  },
  daysOff: [
    {
      type: Date,
      default: [],
    },
  ],
  hasADayOff: {
    type: Boolean,
    default: false,
  },
  workingHours: {
    start: {
      type: Number,
      default: 8,
    },
    end: {
      type: Number,
      default: 20,
    },
    lunchBreakStart: {
      type: Number,
      default: 14,
    },
    lunchBreakEnd: {
      type: Number,
      default: 15,
    },
  },
  isCurrentlyWorking: {
    type: Boolean,
    default: false,
  },
});

specialistSchema.pre("save", function (next) {
  const now = new Date();
  const hour = now.getHours();

  const formattedToday = now.toISOString().slice(0, 10);

  if (
    this.daysOff.some(
      (dayOff) => dayOff.toISOString().slice(0, 10) === formattedToday
    )
  ) {
    this.hasADayOff = true;
  } else {
    this.hasADayOff = false;
  }

  if (
    (this.workingHours.start <= this.workingHours.end &&
      hour >= this.workingHours.start &&
      hour < this.workingHours.end) ||
    (this.workingHours.start > this.workingHours.end &&
      (hour >= this.workingHours.start || hour < this.workingHours.end))
  ) {
    if (
      hour < this.workingHours.lunchBreakStart ||
      hour >= this.workingHours.lunchBreakEnd
    ) {
      this.isCurrentlyWorking = true;
    } else {
      this.isCurrentlyWorking = false;
    }
  } else {
    this.isCurrentlyWorking = false;
  }

  next();
});

export const Specialist = mongoose.model<ISpecialist>(
  "Specialist",
  specialistSchema
);
