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

  async getBaskets(args) {
    const baskets = await HttpClient.get('baskets', args, this.authHeaders);
    return {
      data: baskets.data,
      headers: baskets.headers,
    };
  }

  async getChart(args) {
    const spendingHistory = await HttpClient.get('spending_history', args, this.authHeaders);
    return {
      data: spendingHistory.data,
      headers: spendingHistory.headers,
    };
  }
}

export default BasketService;
