import mongoose, { ConnectionOptions } from 'mongoose';
import User from './User';
import Request from './Request';
import Chat from './Chat';
import Message from './Message';
import { dataGeneration } from '../mocks/data';

export * from './User';
export * from './Request';
export * from './Chat';
export * from './Message';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE, MONGO_PORT } = process.env;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_DATABASE}/${MONGO_PORT}?authMechanism=SCRAM-SHA-1&authSource=admin`;

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, options)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('MongoDB connection error. ' + err));

const generateMockData = async () => {
  const defaultUser = await User.findOne({ email: 'default@email.com' });
  if (!defaultUser) {
    dataGeneration();
  }
  // const messages = await Message.find({});
  // console.log(messages);
  // await Promise.all(
  //   messages.map((m) =>
  //     Chat.findOneAndUpdate({ _id: m.chatId }, { $set: { users: [m.from, m.to] } }),
  //   ),
  // );

  // const users = await User.find({});
  // await Promise.all(
  //   users.map((u) =>
  //     u.orgType !== 'SUPERMARKET' && u.orgType !== 'RESTAURANT' && u.orgType !== 'CAFETERIA'
  //       ? u.updateOne({ $set: { orgType: 'NONPROFIT' } })
  //       : null,
  //   ),
  // );
};

generateMockData();

export default {
  User,
  Request,
  Chat,
  Message,
};
