import express from 'express';
import path from 'path';
import { ProductHunterApi } from './libs/product-hunter-api';
import { HunterApiConfiguration } from './libs/model';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : '';
const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '';
const baseUrl = process.env.baseUrl ? process.env.baseUrl : '';

const config = new HunterApiConfiguration(clientId, clientSecret);
const hunterApi = new ProductHunterApi(config, baseUrl);

const appPath = path.join(__dirname, '../../../../product-daily-hunter');

const app = express();
app.use(express.json());

const angularPath = path.join(appPath, 'browser');
app.use(express.static(angularPath));

app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'Hello API' }).end();
});

app.get('/api/products/:publicDate', (req, res) => {
  const publicDate = req.params.publicDate as string;
  if (!isNaN(new Date(publicDate).getDate())) {
    hunterApi
      .getProductReleasedByDate(publicDate)
      .then((data) => {
        res.status(201).json(data).end();
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: 'Invalid Date' }).end();
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
