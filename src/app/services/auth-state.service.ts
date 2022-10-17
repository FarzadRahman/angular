import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  constructor(public token: TokenService) {}
  
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  userAuthState = this.userState.asObservable();
 
  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
