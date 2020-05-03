import casual from 'casual';
import db, { UserModel } from '../models';
import { Types } from 'mongoose';
import { updateChatLastMessage, updateUserWithChats } from '../controllers/chatLiveController';

const orgTypes = ['SUPERMARKET', 'NONPROFIT', 'RESTAURANT', 'CAFETERIA'];

const createUser = ({
  email = casual.email,
  password = '123456',
  orgType = casual.random_element(orgTypes),
  orgName = casual.company_name,
}) => db.User.create({ email, password, orgType, orgName });

interface RequestCreation {
  user: UserModel<Types.ObjectId, Types.ObjectId>;
  message?: string;
  place?: string;
  startTime?: string;
  endTime?: string;
  foodList?: string;
}

const createRequest = async ({
  user,
  message = casual.string,
  place = casual.address,
  startTime = new Date().toISOString(),
  endTime = new Date().toISOString(),
  foodList = casual.string.replace(' ', ', '),
}: RequestCreation) => {
  const request = await db.Request.create({
    message,
    place,
    startTime,
    endTime,
    foodList,
    user: user.id,
    reqType: user.orgType === 'SUPERMARKET' ? 'offer' : 'need',
  });
  user.requests.push(request.id);
  await user.save();
  return request;
};

interface ChatCreation {
  from: string;
  to: string;
  content?: string;
}

const createChat = async ({ from, to, content = casual.string }: ChatCreation) => {
  const chat = await db.Chat.create({ users: [from, to] });
  const message = await db.Message.create({
    from,
    to,
    content,
    chatId: chat.id,
  });
  await Promise.all([
    updateChatLastMessage(chat.id, message.id),
    updateUserWithChats(from, chat.id),
    updateUserWithChats(to, chat.id),
  ]);
};

export const dataGeneration = async () => {
  const createDefaultUser = () =>
    createUser({
      email: 'default@email.com',
      password: '123456',
    });
  const createRandomUsers = () => new Array(50).fill('').map(() => createUser({}));
  const users = await Promise.all([createDefaultUser(), ...createRandomUsers()]);
  await Promise.all(users.map((user) => createRequest({ user })));
  await Promise.all(
    users.map((u, i) => (i !== 0 && i < 10 ? createChat({ from: u.id, to: users[0].id }) : null)),
  );
};
