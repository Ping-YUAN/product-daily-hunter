/* eslint-disable @typescript-eslint/no-explicit-any */
import { lastValueFrom, of } from 'rxjs';
import {
  getProductByReleasedDate,
  hunterApi,
} from './product-hunter.controller';
describe('test for product hunter controller', () => {
  it('should test get product by release date success', () => {
    jest.spyOn(hunterApi, 'getProductReleasedByDate').mockImplementation(() => {
      return lastValueFrom(
        of({
          pageInfo: {
            hasNextPage: false,
            endCursor: 'xx',
            totalCount: 0,
          },
          posts: [],
        })
      );
    });
    getProductByReleasedDate('2023-01-12').then((data) => {
      const productPagedData = data as any;
      expect(productPagedData).toBeTruthy();
      expect(productPagedData.posts.length).toBe(0);
    });
  });

  it('should throw error', () => {
    const errorMessage = 'internal error';
    jest
      .spyOn(hunterApi, 'getProductReleasedByDate')
      .mockRejectedValueOnce(new Error(errorMessage));

    getProductByReleasedDate('2023-01-12').catch((err) => {
      expect(err).toBeTruthy();
    });
  });

  it('should reject when not a valid date', () => {
    getProductByReleasedDate('dsf').catch((err) => {
      expect(err).toBeTruthy();
    });
  });
});
