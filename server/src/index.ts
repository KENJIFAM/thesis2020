import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import socketIo from 'socket.io';
import authController from './controllers/authController';
import userController from './controllers/userController';
import requestController from './controllers/requestController';
import chatLiveController, { socketController } from './controllers/chatLiveController';
import chatController from './controllers/chatController';
import errorHandler from './middleware/error';
import auth from './middleware/auth';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);
app.use('/profile/', auth, userController);
app.use('/requests/', auth, requestController);
app.use('/chats/', auth, chatController);
app.use('/chatlive/', chatLiveController);

app.get('/*', (req, res) => res.send('Welcome to Food Help APIs!'));

app.use(errorHandler);

const server = http.createServer(app);
const io = socketIo(server, {
  path: '/chatlive',
});

io.on('connection', (socket) => socketController(socket, io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
