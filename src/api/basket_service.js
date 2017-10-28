import HttpClient from './http_client';
import StorageManager from '../helpers/storage_manager';

class BasketService {
  constructor() {
    if (StorageManager.get('userInfo') !== null) {
      this.authHeaders = {
        'Content-Type': 'application/json',
        Authorization: StorageManager.get('userInfo').token,
      };
    }
  }

  getBaskets(args) {
    return this.getResponse('baskets', args);
  }

  getChart(args) {
    return this.getResponse('spending_history', args);
  }

  async getResponse(urlSuffix, args) {
    const response = await HttpClient.get(urlSuffix, args, this.authHeaders);
    return {
      data: response.data,
      headers: response.headers,
    };
  }


}

export default BasketService;
