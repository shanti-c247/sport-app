import type { Document, Types } from 'mongoose';

export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  role: number;
  status: number;
  dateOfBirth?: Date;
  picture?: string;
  description?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

export interface UnifiedUserServiceResponse {
  status: number;
  success: boolean;
  message: string;
  data: any | null;
}

export interface SetPasswordTokenResult {
  token: string;
  hashedToken: string;
  expireDate: Date;
}

export interface IAppSecret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}
