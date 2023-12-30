import { Model, Schema } from "mongoose";

export type shiftPartialSearch = {
  searchTerm?: string;
};

export type IShift = {
  date: string;
  startTime: string;
  endTime: string;
  employee: Schema.Types.ObjectId;
};

export type ShiftModel = Model<IShift, Record<string, unknown>>;
