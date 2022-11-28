import { Component, OnInit,Input } from '@angular/core';
import {  CartService } from '../../services/cart.service';
import{ GlobalComponent } from '../../global-component';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items:any=[];
  apiUrl:any;
  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.apiUrl=GlobalComponent.appUrl;
    this.getAllData();
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


}
