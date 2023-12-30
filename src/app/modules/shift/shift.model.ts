import { Schema, model } from "mongoose";
import { IShift, ShiftModel } from "./shift.interface";

const shiftSchema = new Schema<IShift, ShiftModel>(
  {
    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },

    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Shift = model<IShift, ShiftModel>("Shift", shiftSchema);
