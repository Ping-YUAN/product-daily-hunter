import {
  HunterApiConfiguration,
  ProductHunterApi,
} from '../models/product-hunter';

const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : '';
const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '';

const config = new HunterApiConfiguration(clientId, clientSecret);
export const hunterApi = new ProductHunterApi(config);

export function getProductByReleasedDate(publicDate) {
  return new Promise((resolve, reject) => {
    if (
      !isNaN(new Date(publicDate).getDate()) &&
      new Date(publicDate) <= new Date()
    ) {
      hunterApi
        .getProductReleasedByDate(publicDate)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject({
        error: 'Invalid Data',
      });
    }
  });
}
