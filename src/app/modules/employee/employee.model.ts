import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { userRole } from "./employee.contant";
import { EmoloyeeModel, IEmployee } from "./employee.interface";

const employeeSchema = new Schema<IEmployee, EmoloyeeModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: userRole,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    shift: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shift",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// unique email and phone number
employeeSchema.pre("save", async function (next) {
  const existingEmail = await this.model("Employee").findOne({
    email: this.email,
  });
  const existingPhone = await this.model("Employee").findOne({
    phone: this.phone,
  });

  if (existingEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, "Email is already in use");
  }
  if (existingPhone) {
    throw new ApiError(httpStatus.FORBIDDEN, "Phone number is already in use");
  }
  next();
});

// id match
employeeSchema.methods.isEmailExist = async function (
  email: string
): Promise<Partial<IEmployee> | null> {
  const employee = await Employee.findOne(
    { email },
    { _id: 1, password: 1, email: 1, role: 1 }
  );
  return employee;
};

// password match
employeeSchema.methods.isPasswordMatch = async function (
  currentPassword: string,
  savePassword: string
): Promise<boolean> {
  const employee = await bcrypt.compare(currentPassword, savePassword);
  return employee;
};

// password hash before save password
employeeSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salts_round)
  );

  next();
});

export const Employee = model<IEmployee, EmoloyeeModel>(
  "Employee",
  employeeSchema
);
