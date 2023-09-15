import express from 'express';
import cors from 'cors';
import routes from './routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = 3000;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

