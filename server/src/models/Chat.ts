import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ChatModel<U = Types.ObjectId, M = Types.ObjectId> extends Document {
  id: string;
  users: Types.Array<U>;
  lastMessage?: M;
  createdAt: Date;
}

const chatSchema = new Schema<ChatModel>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
