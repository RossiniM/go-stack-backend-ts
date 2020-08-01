import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
