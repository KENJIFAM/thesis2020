import mongoose, { ConnectionOptions } from 'mongoose';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE, MONGO_PORT } = process.env as {
  [key: string]: string;
};

mongoose.set('debug', true);
mongoose.Promise = Promise;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_DATABASE}/${MONGO_PORT}?authMechanism=SCRAM-SHA-1&authSource=admin`;
const options: ConnectionOptions = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('MongoDB connection error. ' + err));
