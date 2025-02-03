// src/models/userModel.ts
import mongoose, { type Model, Schema } from 'mongoose';

//Config
import { defaultRole, roles } from '@config/index';

//Constants
import { commonVariables } from '@constants';

//enums
import { UserStatus } from '@enums';

//Custom types
import type { IUser } from '@customTypes';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      enum: roles,
      default: defaultRole,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    countryCode: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      default: UserStatus.Active,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  },
);

// Customize JSON transformation to exclude sensitive data
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id; // Add id
    commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
    return ret;
  },
});

export const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

// Function to format the user document
export const modelToDomain = (userDoc: IUser) => {
  const formattedDoc = {
    id: userDoc.id.toString(),
    email: userDoc.email,
    name: userDoc.name,
    role: userDoc.role,
    status: userDoc.status === null ? undefined : userDoc.status,
    isDeleted: userDoc.isDeleted === null ? undefined : userDoc.isDeleted,
    createdAt: userDoc.createdAt === null ? undefined : userDoc.createdAt,
    updatedAt: userDoc.updatedAt === null ? undefined : userDoc.updatedAt,
    description: userDoc.description === null ? undefined : userDoc.description,
    dateOfBirth: userDoc.dateOfBirth === null ? undefined : userDoc.dateOfBirth,

  };
  // Optionally, you can also sanitize any nested objects or arrays if needed
  return formattedDoc;
};
