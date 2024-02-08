import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, Types, model } from "mongoose";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { userRole } from "./user.constant";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
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
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    cart: {
      type: [],
    },
    newPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Add method to add product to user
userSchema.methods.addProductToUser = async function (
  productId: Types.ObjectId
) {
  this.products.push(productId);
  await this.populate("products").execPopulate();
  await this.save();
};

// unique email and phone number
userSchema.pre("save", async function (next) {
  const existingEmail = await this.model("User").findOne({
    email: this.email,
  });
  const existingPhone = await this.model("User").findOne({
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
userSchema.methods.isEmailExist = async function (
  email: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { email },
    { _id: 1, password: 1, email: 1, role: 1 }
  );
  return user;
};

// password match
userSchema.methods.isPasswordMatch = async function (
  currentPassword: string,
  savePassword: string
): Promise<boolean> {
  const user = await bcrypt.compare(currentPassword, savePassword);
  return user;
};

// password hash before save password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salts_round)
  );

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
