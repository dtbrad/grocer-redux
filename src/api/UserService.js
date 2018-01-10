import HttpClient from './HttpClient';

class UserService {
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

export default UserService;
