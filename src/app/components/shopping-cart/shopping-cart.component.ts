import { Component, OnInit,Input } from '@angular/core';
import {  CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items:any=[];
  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){this.items = this.cartService.getItems();}


  clearCart(){
    this.cartService.clearCart();
    this.getAllData();
  }


}
