import axios, { AxiosInstance } from 'axios';

export class HunterApiConfiguration {
  clientId: string;
  clientSecret: string;
  apiKey: string;
  api: AxiosInstance;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    this.api = axios.create({
      baseURL: process.env.BASE_URL,
    });

    this.api.interceptors.request.use(
      async (config) => await this.onRequest(config),
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getApiKey(clientId: string, clientSecret: string) {
    const res = await this.api.post(process.env.OAUTH_URL, {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });
    return res.data.access_token;
  }

  async onRequest(config) {
    if (config.url.includes('oauth/token')) return config;
    if (!this.apiKey) {
      const token = await this.getApiKey(this.clientId, this.clientSecret);
      this.apiKey = token;
    }
    config.headers['Authorization'] = `Bearer ${this.apiKey}`;
    return config;
  }
}
