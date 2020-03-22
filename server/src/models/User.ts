import mongoose, { Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserModel extends Document {
  id: string;
  email: string;
  password: string;
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
  validatePassword: (password: string, next: HookNextFunction) => Promise<boolean>;
  generateJwt: (next: HookNextFunction) => Promise<string>;
}

const userSchema = new mongoose.Schema<UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    orgType: {
      type: String,
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
