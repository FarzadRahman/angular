import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {AuthService} from '../../auth.service';
import {TokenService} from '../../services/token.service';
import {AuthStateService} from '../../services/auth-state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  userName: string = '';
  password: string = '';
  phone: string = '';
  email: FormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  formData: FormGroup;
  errors: any = null;
  submitted = false;

  constructor(private authService: AuthService,
              private router: Router,
              private token: TokenService,
              private authState: AuthStateService,
              private formBuilder: FormBuilder
  ) {
  }

  get registerFormControl() {
    return this.formData.controls;
  }

  ngOnInit() {
    // console.log(this.token.isValidToken());
    // if(this.token.isValidToken()){
    //   this.router.navigate(['/']);
    // }
    this.formData = this.formBuilder.group({
      // userName: new FormControl("admin"),
      userName: new FormControl('', [
        Validators.required,
        Validators.email]),
      phone: new FormControl('', [
        Validators.required]),

      address: new FormControl('', [
        Validators.required]),
      password: new FormControl(),
      email: new FormControl('', [
        Validators.required,
        Validators.email]),
      repeatPass: new FormControl()
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
    // console.log(data);

    this.authService.register(data).subscribe(
      (result) => {
        console.log(result);

      },
      (error) => {
        console.log(error);
        this.errors = error.error;
      },
      () => {
        // this.authState.setAuthState(true);
        // //  this.loginForm.reset();
        alert("Registration Successful");
        this.router.navigate(['/login']);
      }
    );
  }

  responseHandler(data: any) {
    this.token.handleData(data.access_token);
  }

}
