import mongoose, { Document, Schema, Types } from 'mongoose';

export interface MessageModel<U = Types.ObjectId> extends Document {
  id: string;
  content: string;
  from: U;
  to: U;
  chatId: string;
}

const messageSchema = new Schema<MessageModel>(
  {
    content: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    chatId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Message = mongoose.model<MessageModel>('Message', messageSchema);

export default Message;
