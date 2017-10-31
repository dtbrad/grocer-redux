import HttpClient from './http_client';

class UsersService {
  static async loginUser(args) {
    try {
      const response = await HttpClient.post('login', args);
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

export default UsersService;
