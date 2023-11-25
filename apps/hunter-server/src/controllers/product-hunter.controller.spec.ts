/* eslint-disable @typescript-eslint/no-explicit-any */
import { lastValueFrom, of } from 'rxjs';
import {
  getProductByReleasedDate,
  hunterApi,
} from './product-hunter.controller';

class MockRes {
  private _status;
  status(code: number) {
    this._status = code;
    return {
      json: () => {
        // eslint-disable-next-line no-unused-labels
        end: () => jest.fn();
      },
    };
  }
  get statusCode() {
    return this._status;
  }
}

const req = {
  params: {
    publicDate: '2023-01-12',
  },
} as any;

const res = new MockRes();
const flushPromises = () => new Promise(setImmediate);
describe('test for product hunter controller', () => {
  it('should test get product by release date success', async () => {
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

    getProductByReleasedDate(req, res);
    await flushPromises();
    expect(res.statusCode).toBe(201);
  });

  it('should throw error', async () => {
    const errorMessage = 'internal error';
    jest
      .spyOn(hunterApi, 'getProductReleasedByDate')
      .mockRejectedValueOnce(new Error(errorMessage));

    getProductByReleasedDate(req, res);
    await flushPromises();
    expect(res.statusCode).toBe(500);
  });

  it('should reject when not a valid date', () => {
    const invalidReq = {
      params: {
        publicDate: 'dssfa',
      },
    } as any;
    getProductByReleasedDate(invalidReq, res);
    expect(res.statusCode).toBe(401);
  });
});
