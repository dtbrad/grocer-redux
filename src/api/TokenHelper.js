import decode from 'jwt-decode';

class TokenHelper {
  static tokenCurrent(key) {
    if (this.get(key)) {
      const currentTime = new Date().getTime() / 1000;
      return currentTime < this.decodedToken(key).exp;
    }
    return false;
  }

  static decodedToken(key) {
    return decode(localStorage.getItem(key));
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static userName(key) {
    const decodedJwt = this.decodedToken(key);
    return decodedJwt.payload.name;
  }

  static userId(key) {
    const decodedJwt = this.decodedToken(key);
    return decodedJwt.payload.id;
  }

  static userEmail(key) {
    const decodedJwt = this.decodedToken(key);
    return decodedJwt.payload.email;
  }
}

export default TokenHelper;
