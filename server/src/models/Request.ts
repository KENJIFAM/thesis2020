import mongoose, { Document, Types, Schema } from 'mongoose';
import User from './User';

export interface RequestModel<U = Types.ObjectId> extends Document {
  id: string;
  message: string;
  place: string;
  startTime: Date;
  endTime: Date;
  foodList: string;
  user: U;
  reqType: 'offer' | 'need';
}

const requestSchema = new Schema<RequestModel>(
  {
    message: { type: String, required: true },
    place: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    foodList: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reqType: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

requestSchema.pre<RequestModel>('remove', async function (next) {
  try {
    const user = await User.findById(this.user);
    user?.requests.remove(this.id);
    await user?.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Request = mongoose.model<RequestModel>('Request', requestSchema);

export default Request;
