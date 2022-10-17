import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login: 'http://localhost/project/api/auth/login',
    register: 'http://localhost/project/api/auth/register',
  };
  constructor() { }

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

    // Verify the token
    isValidToken() {
      const token = this.getToken();
      if (token) {
        const payload = this.payload(token);
        if (payload) {
          return Object.values(this.issuer).indexOf(payload.iss) > -1
            ? true
            : false;
        }
      } else {
        return false;
      }
    }

      // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }


}
