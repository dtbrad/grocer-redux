import axios from 'axios';

const URL = process.env.REACT_APP_URL;

class HttpClient {
  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  static get(urlSuffix, params, headersArg) {
    const headers = headersArg || this.defaultHeaders;
    return axios({
      method: 'get',
      url: `${URL}/${urlSuffix}`,
      params,
      headers,
    });
  }

  static post(urlSuffix, params, headersArg) {
    const headers = headersArg || this.defaultHeaders;
    return axios({
      method: 'post',
      url: `${URL}/${urlSuffix}`,
      params,
      headers,
    });
  }
}

export default HttpClient;
