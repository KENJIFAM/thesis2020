import mongoose, { Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestModel } from './Request';

export interface UserModel extends Document {
  id: string;
  email: string;
  password: string;
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'RESTAURANT' | 'CAFETERIA';
  orgName: string;
  requests: mongoose.Types.Array<RequestModel['id']>;
  validatePassword: (password: string, next: HookNextFunction) => Promise<boolean>;
  generateJwt: (next: HookNextFunction) => Promise<string>;
}

export interface JwtPayload {
  id: string;
  email: string;
}

const userSchema = new mongoose.Schema<UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orgType: { type: String, required: true },
    orgName: { type: String, required: true },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre<UserModel>('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (inputPassword, next): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

userSchema.methods.generateJwt = async function (next): Promise<string> {
  try {
    const { id }: JwtPayload = this;
    return jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: '6h' });
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
