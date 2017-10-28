import HttpClient from './http_client';
import StorageManager from '../helpers/storage_manager';

class BasketService {
  constructor(){
    if(StorageManager.get("userInfo")!== null) {
      this.authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': StorageManager.get('userInfo').token
      };
    };
  }

  getBaskets(args) {
    return HttpClient.get('baskets', args, this.authHeaders)
    .then((response) => {
      return { data: response.data,
               headers: response.headers
             };
    });
  };

  getChart(args) {
    return HttpClient.get('spending_history', args, this.authHeaders)
    .then((response) => {
      return { data: response.data,
               headers: response.headers
             };
    });
  };

}

export default BasketService;
