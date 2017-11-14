import HttpClient from './http_client';
import TokenHelper from '../auth/token_helper';

class ProductService {
  static setHeaders() {
    if (TokenHelper.get('jwt') !== null) {
      return {
        'Content-Type': 'application/json',
        Authorization: TokenHelper.get('jwt'),
      };
    }
    return null;
  }

  static getProducts(args) {
    return this.getResponse('products', args);
  }

  static getProduct(args) {
    return this.getResponse(`products/${args.id}`, args);
  }

  static getChart(args) {
    return this.getResponse('product_spending_chart', args);
  }

  static getIndexChart() {
    return this.getResponse('products_index_total_spent_chart');
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

export default ProductService;
