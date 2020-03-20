import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/*', (req, res) => {
  res.send('Welcome to Food Help APIs!');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log('Server is running at port 4001');
});
