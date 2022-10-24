import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import{ GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  response={};

  // login(userName: string, password: string): Observable <any>{

  //    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
  //    this.http.post('http://localhost/project/api/auth/login', {email:userName,password:password}).subscribe(
  //     (result) => {
  //       console.log(result);
     
  //     //   localStorage.setItem('isUserLoggedIn', result);
  //     },
  //     (error) => {
  //     //   this.errors = error.error;
  //        console.log("Login Failed");
  //     },
  //     () => {
  //     //   this.authState.setAuthState(true);
  //     //   this.loginForm.reset();
  //     //   this.router.navigate(['profile']);
  //     }
  //   );


     
    //  localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 

  // return of(this.isUserLoggedIn).pipe(
  //    delay(1000),
  //    tap(val => { 
  //     //   console.log("Is User Authentication is successful: " + val); 
  //     console.log(this.response);
  //    })
  // );
  // }

   // Login
   login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(GlobalComponent.APIUrl+'auth/login', {email:userName,password:password});
  }

  logout(): void {
  this.isUserLoggedIn = false;
     localStorage.removeItem('isUserLoggedIn'); 
  }

  constructor(private http: HttpClient) { }




}
