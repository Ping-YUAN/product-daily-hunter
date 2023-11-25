import {
  HunterApiConfiguration,
  ProductHunterApi,
} from '../models/product-hunter';

const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : '';
const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '';

const config = new HunterApiConfiguration(clientId, clientSecret);
export const hunterApi = new ProductHunterApi(config);

export function getProductByReleasedDate(req, res) {
  const publicDate = req.params.publicDate as string;
  if (
    !isNaN(new Date(publicDate).getDate()) &&
    new Date(publicDate) <= new Date()
  ) {
    hunterApi
      .getProductReleasedByDate(publicDate)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(err.status ? err.status : 500).json(err);
      });
  } else {
    res.status(401).json({
      error: 'Invalid Data',
    });
  }
}
