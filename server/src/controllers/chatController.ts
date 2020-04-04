import express from 'express';
import db, { UserModel, ChatModel, MessageModel } from '../models';
import { updateChatLastMessage, updateUserWithChats, populateMessage } from './chatLiveController';
import { AuthRequest } from '../middleware/auth';
import { Types } from 'mongoose';

const router = express.Router();

// POST new message
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.content || !req.body.from || !req.body.to) {
      return next({ status: 400, message: 'Invalid request!' });
    }
    if (req.body.chatId) {
      const message = await db.Message.create(req.body);
      const [populatedMessage, updatedChat] = await Promise.all([
        populateMessage(message),
        updateChatLastMessage(req.body.chatId, message.id),
      ]);
      return res.status(200).json({ message: populatedMessage, chat: updatedChat });
    }
    const chat = await db.Chat.create({
      users: [req.body.from, req.body.to],
    });
    const message = await db.Message.create({
      ...req.body,
      chatId: chat.id,
    });
    const [populatedMessage, updatedChat] = await Promise.all([
      populateMessage(message),
      updateChatLastMessage(chat.id, message.id),
      updateUserWithChats(req.body.from, chat.id),
      updateUserWithChats(req.body.to, chat.id),
    ]);
    return res.status(200).json({ message: populatedMessage, chat: updatedChat });
  } catch (err) {
    return next(err);
  }
});

// GET chats list
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const user = (await db.User.findById(req.auth?.id)?.populate({
      path: 'chats',
      populate: [{ path: 'users', select: 'id orgType orgName' }, { path: 'lastMessage' }],
    })) as UserModel<Types.ObjectId, ChatModel<UserModel, MessageModel>> | null;
    const chats = user?.chats.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    return res.status(200).json(chats);
  } catch (err) {
    return next(err);
  }
});

// GET messages from specific chatId
router.get('/:chatId', async (req, res, next) => {
  try {
    const messages = await db.Message.find({ chatId: req.params.chatId })
      .sort({ createdAt: 'asc' })
      .populate('from', 'id orgType orgName')
      .populate('to', 'id orgType orgName');
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

// DELETE ALL => test purpose
router.delete('/', async (req, res, next) => {
  try {
    await Promise.all([
      db.Chat.deleteMany({}),
      db.Message.deleteMany({}),
      db.User.updateMany({}, { $set: { chats: [] } }),
    ]);
    return res.status(200).json({ message: 'Deleted all chats and messages' });
  } catch (err) {
    return next(err);
  }
});

export default router;
