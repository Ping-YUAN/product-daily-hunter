import express from 'express';
import path from 'path';
import { productRouter } from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const appPath = path.join(__dirname, '../../../../product-daily-hunter');

const app = express();
app.use(express.json());

const angularPath = path.join(appPath, 'browser');
app.use(express.static(angularPath));

app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'Hello API' }).end();
});

app.use('/api/products/', productRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
