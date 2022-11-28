import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  EventsService } from '../../services/events.service';
import {  CartService } from '../../services/cart.service';
import {  EventModel } from '../../model/event-model';
import{ GlobalComponent } from '../../global-component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  id: number;
  apiUrl:any;
  event: EventModel=new EventModel();

  constructor(    private route: ActivatedRoute,
    private router: Router,
    private eventService : EventsService,
                  private cartService: CartService) {
      // force route reload whenever params change;
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.event.title="123";
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.apiUrl=GlobalComponent.appUrl;
    // this.activeRoute.params.subscribe(routeParams => {
    //   this.loadUserDetail(routeParams.id);
    // });
     // do something with the parameters
    //  this.loadUserDetail(routeParams.id);

    this.eventService.getSingle(this.id).subscribe(
      (result:any) => {
       this.event=result;
       console.log(this.event);

      },
      (error:any) => {
       console.log(error);

      },
      () => {

      }
    );
  }

  addItemToCart(item:any){
    console.log(item);
    this.cartService.addToCart(item);
    window.alert('Your product has been added to the cart!');
    this.cartService.getItems();
  }

    // console.log(this.id);

}


