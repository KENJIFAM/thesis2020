import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ChatModel extends Document {
  id: string;
  users: Types.ObjectId[];
  lastMessage?: Types.ObjectId;
}

const chatSchema = new Schema<ChatModel>(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Chat = mongoose.model<ChatModel>('Chat', chatSchema);

export default Chat;
