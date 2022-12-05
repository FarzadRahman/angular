import { Component, OnInit,Input } from '@angular/core';
import {  CartService } from '../../services/cart.service';
import{ GlobalComponent } from '../../global-component';
import {TokenService} from "../../services/token.service";
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items:any=[];
  apiUrl:any;
  isLoggedIn:any;
  userData:any;
  constructor( private cartService: CartService,
               private  token: TokenService,
               private authService:AuthService,
               private router: Router,
               private http:HttpClient) { }

  ngOnInit(): void {
    this.apiUrl=GlobalComponent.appUrl;
    this.getAllData();
    // console.log(this.token.getToken());
    // console.log(this.authService.me(this.token.getToken()));
    this.getLoginInfo();
    // const total = this.items.reduce((sum:number, item:any) => sum + item.price, 0);
    // console.log(total);
    // this.cartTotal();
  }

  public cartTotal(): number {

    let total: number = 0;

    this.items.forEach((e:any) => {
      total = total + Number(e.price);
    });

    // console.log(total);
    return total;
  }

  getLoginInfo(){

    this.authService.me(this.token.getToken()).subscribe(
      (result) => {

        this.userData=result;

        this.isLoggedIn=true;
        console.log(this.userData);

      },
      (error) => {
        console.log(error);
        this.isLoggedIn=false;
        // this.errors = error.error;
      },
      () => {
        // this.authState.setAuthState(true);
        // //  this.loginForm.reset();
        // alert("Registration Successful");
        // this.router.navigate(['/login']);
      }
    );
  }

  getAllData(){this.items = this.cartService.getItems(); console.log(this.items);}
  clearCartItem(index:any){
    console.log(index);
    this.cartService.removeItem(index);
    this.getAllData();



  }

  clearCart(){
    this.cartService.clearCart();
    this.getAllData();
  }

  checkout(){
    let data={'events':this.items,'user':this.userData};

    this.http.post<any>(GlobalComponent.APIUrl+'place/order', data).subscribe((result) => {
      alert('Order Posted');
      console.log(result);
      this.clearCart();
    },
      (error) => {
        console.log(error);
        // this.isLoggedIn=false;
        // this.errors = error.error;
      },
      () => {
        // this.authState.setAuthState(true);
        // //  this.loginForm.reset();
        // alert("Registration Successful");
        this.router.navigate(['/']);
      }
    )
  }


}
