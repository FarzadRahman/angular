import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string='';
  password: string='';
  formData: FormGroup;
  errors:any = null;

  constructor(private authService : AuthService,
    private router : Router,
    private token: TokenService,
    private authState: AuthStateService

    ) { }


  ngOnInit() {
    // console.log(this.token.isValidToken());
    if(this.token.isValidToken()){
      this.router.navigate(['/']);
    }
     this.formData = new FormGroup({
        // userName: new FormControl("admin"),
        userName: new FormControl('',[
          Validators.required,
          Validators.email]),
        password: new FormControl(),
     });
  }

//   onClickSubmit(data: any) {
//      this.userName = data.userName;
//      this.password = data.password;

//     //  console.log("Login USER: " + this.userName);
//     //  console.log("Login PASS: " + this.password);

//      this.authService.login(this.userName, this.password)
//         .subscribe( data => {
//            console.log("Is Login Success: " + data);

//           // if(data) this.router.navigate(['/expenses']);
//      });
//   }

onClickSubmit(data: any) {
   this.userName = data.userName;
   this.password = data.password;
   this.authService.login(this.userName, this.password).subscribe(
     (result) => {
      console.log(result);
       this.responseHandler(result);
     },
     (error) => {
      console.log(error);
       this.errors = error.error;
     },
     () => {
       this.authState.setAuthState(true);
      //  this.loginForm.reset();
       this.router.navigate(['/']);
     }
   );
 }

 responseHandler(data:any) {
   this.token.handleData(data.access_token);
 }
}
