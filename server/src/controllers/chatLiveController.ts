import express from 'express';
import db, { MessageModel } from '../models';
import type { Socket, Server } from 'socket.io';

interface Data {
  content: string;
  from: string;
  to: string;
  chatId?: string;
  isNewChat: boolean;
}

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    return res.status(200).json({ message: "I'm live" });
  } catch (err) {
    return next(err);
  }
});

export const updateUserWithChats = async (id: string, chatId: string) => {
  const user = await db.User.findById(id);
  user?.chats.push(chatId);
  await user?.save();
};

export const updateChatLastMessage = (_id: string, messageId: string) =>
  db.Chat.findOneAndUpdate({ _id }, { $set: { lastMessage: messageId } }, { new: true })
    .populate('users', 'id orgType orgName')
    .populate('lastMessage');

export const populateMessage = (message: MessageModel) =>
  message
    .populate('from', 'id orgType orgName')
    .populate('to', 'id orgType orgName')
    .execPopulate();

export const socketController = (socket: Socket, io: Server) => {
  console.log('new connection');

  socket.on('disconnect', () => console.log('user disconnected'));

  socket.on('message', async (data: Data) => {
    try {
      if (!data.content || !data.from || !data.to) {
        throw new Error('Invalid request!');
      }
      if (data.chatId) {
        const message = await db.Message.create(data);
        const [populatedMessage, updatedChat] = await Promise.all([
          populateMessage(message),
          updateChatLastMessage(data.chatId, message.id),
          data.isNewChat ? updateUserWithChats(data.to, data.chatId) : null,
        ]);
        return io.emit('message', { message: populatedMessage, chat: updatedChat });
      }
      const chat = await db.Chat.create({
        users: [data.from, data.to],
      });
      const message = await db.Message.create({
        ...data,
        chatId: chat.id,
      });
      const [populatedMessage, updatedChat] = await Promise.all([
        populateMessage(message),
        updateChatLastMessage(chat.id, message.id),
        updateUserWithChats(data.from, chat.id),
        updateUserWithChats(data.to, chat.id),
      ]);
      return io.emit('message', { message: populatedMessage, chat: updatedChat });
    } catch (err) {
      console.log(err);
      return;
    }
  });
};

export default router;
