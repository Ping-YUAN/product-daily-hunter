import express from 'express';
import { getProductByReleasedDate } from '../controllers/product-hunter.controller';

export const productRouter = express.Router();

productRouter.get('/:publicDate', (req, res) => {
  const publicDate = req.params.publicDate as string;
  getProductByReleasedDate(publicDate)
    .then((data) => {
      res.status(201).json(data).end();
    })
    .catch((err) => {
      res.status(err.status ? err.status : 500).json(err);
    });
});
