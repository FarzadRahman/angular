import { Injectable } from '@angular/core';
import {count, Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items:any = [];

  private cartCount = new ReplaySubject<number>(1);
  cartCount$ = this.cartCount.asObservable();
  constructor() {
    const carItemsString= localStorage.getItem('localCarts');
    // @ts-ignore
    this.items = JSON.parse(carItemsString);
  }


  setCartCount(count: number) {
    // encapsulate with logic to set local storage
    // localStorage.setItem("cart_count", JSON.stringify(count));
    this.cartCount.next(count);
  }

  // getCartCount(): Observable<number> {
  //   // return count(this.items);
  //   return this.cartCount.asObservable();
  // }

  addToCart(product:any) {
    this.items.push(product);
    const carItemsString:string = JSON.stringify(this.items);
    localStorage.setItem('localCarts', carItemsString);
    // this.setCartCount();

  }

  removeItem(index: number){
    this.items.splice(index, 1);
    const carItemsString:string = JSON.stringify(this.items);
    localStorage.setItem('localCarts', carItemsString);
  }


  getItems() {
    this.cartCount.next(this.items.length);
    const carItemsString= localStorage.getItem('localCarts');
    // @ts-ignore
    this.items = JSON.parse(carItemsString);
    return this.items;
  }

  clearCart() {
    this.items = [];
    const carItemsString:string = JSON.stringify(this.items);
    localStorage.setItem('localCarts', carItemsString);
    return this.items;
  }

}
