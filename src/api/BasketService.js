import HttpClient from './HttpClient';
import TokenHelper from './TokenHelper';

class BasketService {
  static setHeaders() {
    if (TokenHelper.get('jwt') !== null) {
      return {
        'Content-Type': 'application/json',
        Authorization: TokenHelper.get('jwt'),
      };
    }
    return null;
  }

  static getBaskets(args) {
    return this.getResponse('baskets', args);
  }

  static getBasket(args) {
    return this.getResponse(`baskets/${args.id}`, args);
  }

  static getChart(args) {
    return this.getResponse('baskets_spending_chart', args);
  }

  static async getResponse(urlSuffix, args) {
    const headers = this.setHeaders();
    try {
      const response = await HttpClient.get(urlSuffix, args, headers);
      return {
        data: response.data,
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      return error.response;
    }
  }
}

export default BasketService;
