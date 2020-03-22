import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import authController from './controllers/authController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/auth', authController);

app.get('/*', (req, res) => {
  res.send('Welcome to Food Help APIs!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running at port 5000');
});
