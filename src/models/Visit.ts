import mongoose, { Document, Schema } from "mongoose";
import { IVisit } from "@/types";
import { VISIT_STATUS } from "@/utils/constants";

const visitSchema = new Schema<IVisit>(
  {
    reservationCode: {
      type: String,
      required: true,
      unique: true,
    },
    visibleCode: {
      type: String,
      required: true,
    },
    visitTime: {
      type: Date,
      required: true,
    },
    specialistAssigned: {
      type: Schema.Types.ObjectId,
      ref: "Specialist",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(VISIT_STATUS),
      default: VISIT_STATUS.PENDING,
    },
    doneAt: {
      type: Date,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    gotPriorityAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

visitSchema.virtual("getPriorityAt").get(function (this: IVisit) {
  if (this.priority) {
    return this.updatedAt || this.createdAt;
  }
  return null;
});

export const Visit = mongoose.model<IVisit>("Visit", visitSchema);
