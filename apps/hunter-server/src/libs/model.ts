export const ShortBaseUrl = 'https://www.producthunt.com';
export class HunterApiConfiguration {
  clientId: string;
  clientSecret: string;
  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
  getClientId() {
    return this.clientId;
  }
  getClientSecret() {
    return this.clientSecret;
  }
}
