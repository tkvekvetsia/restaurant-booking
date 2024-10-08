import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusHelperService {

  public isUserLoggedIn(): boolean {
    const accessToken = localStorage.getItem('AccessToken');
    const helper = new JwtHelperService();

    if (!accessToken) {
      return false;
    }

    let accessTokenIsValid: boolean;
    let accessTokenIsExpired: boolean | null;
    try {
      accessTokenIsExpired = helper.isTokenExpired(accessToken);
      accessTokenIsValid = true;
    } catch {
      accessTokenIsValid = false;
      accessTokenIsExpired = null;
    }

    if (accessTokenIsValid && !accessTokenIsExpired) {
      return true;
    }


    return !!accessToken && accessTokenIsValid && !accessTokenIsExpired;
  }
}
