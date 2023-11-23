/* eslint-disable @typescript-eslint/no-explicit-any */
import { lastValueFrom, of } from 'rxjs';
import { HunterApiConfiguration } from './product-hunter-config.model';
import * as axios from 'axios';

const CLIENT_ID = 'test_id';
const CLIENT_SECRET = 'test_secret';
const originalEnv = process.env;
const ACCESS_TOKEN = 'xxx';

jest.mock('axios');
jest.spyOn(axios.default, 'create').mockImplementation(() => {
  return {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    post: () =>
      lastValueFrom(
        of({
          data: {
            access_token: ACCESS_TOKEN,
          },
        })
      ),
  } as any;
});
const config = new HunterApiConfiguration(CLIENT_ID, CLIENT_SECRET);

describe('test hunter api config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      CLIENT_ID: CLIENT_ID,
      CLIENT_SECRET: CLIENT_SECRET,
      BASE_URL: 'https://api.producthunt.com/',
      OAUTH_URL: 'v2/oauth/token',
      GRAPHQL: 'v2/api/graphql',
    };
  });
  afterEach(() => {
    process.env = originalEnv;
    config.apiKey = '';
  });
  test('test constructor', () => {
    expect(config.clientId).toBe('test_id');
  });
  test('test get api key', async () => {
    jest.spyOn(axios.default, 'post').mockImplementation(() =>
      Promise.resolve({
        access_token: 'xxx',
      })
    );
    const token = await config.getApiKey(CLIENT_ID, CLIENT_SECRET);

    expect(token).toBe(ACCESS_TOKEN);
  });

  test('test on request', async () => {
    const configReq = {
      url: '/oauth/token',
      headers: {
        Authorization: '',
      },
    };
    const afterInterceptorAuthConfig = await config.onRequest(configReq);
    expect(afterInterceptorAuthConfig.headers.Authorization).toBeFalsy();
    configReq.url = 'v2';
    const afterInterceptorReqConfig = await config.onRequest(configReq);
    expect(afterInterceptorReqConfig.headers.Authorization).toBe(
      `Bearer ${ACCESS_TOKEN}`
    );
  });
});
