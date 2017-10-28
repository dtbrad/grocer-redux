import axios from 'axios';
const URL = process.env.REACT_APP_URL;

class HttpClient {
  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  static get(urlSuffix, params, headers) {
    headers = headers || this.defaultHeaders;
    return axios({
      method: 'get',
      url: `${URL}/${urlSuffix}`,
      params: params,
      headers: headers
    });
  };
}

export default HttpClient;
