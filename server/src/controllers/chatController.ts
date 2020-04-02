import express from 'express';
import db from '../models';
import type { Socket, Server } from 'socket.io';

interface Data {
  content: string;
  from: string;
  to: string;
  chatId?: string;
}

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    return res.status(200).json({ message: "I'm live" });
  } catch (err) {
    return next(err);
  }
});

const updateUserWithChats = async (id: string, chatId: string) => {
  const user = await db.User.findById(id);
  user?.chats.push(chatId);
  await user?.save();
};

const updateChatLastMessage = (id: string, messageId: string) =>
  db.Chat.findOneAndUpdate({ id }, { $set: { lastMessage: messageId } }, { new: true });

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
        const chat = await updateChatLastMessage(data.chatId, message.id);
        return io.emit('message', { message, chat });
      }
      const chat = await db.Chat.create({
        users: [data.from, data.to],
      });
      const message = await db.Message.create({
        ...data,
        chatId: chat.id,
      });
      const [updatedChat] = await Promise.all([
        updateChatLastMessage(chat.id, message.id),
        updateUserWithChats(data.from, chat.id),
        updateUserWithChats(data.to, chat.id),
      ]);
      return io.emit('message', { message, updatedChat });
    } catch (err) {
      console.log(err);
      return;
    }
  });
};

export default router;