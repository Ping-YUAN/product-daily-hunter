import express from 'express';
import { getProductByReleasedDate } from '../controllers/product-hunter.controller';

export const productRouter = express.Router();

productRouter.get('/:publicDate', getProductByReleasedDate);
