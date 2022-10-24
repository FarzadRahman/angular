import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  EventsService } from '../../services/events.service';
import {  EventModel } from '../../model/event-model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  id: number;
  event: EventModel=new EventModel();
  
  constructor(    private route: ActivatedRoute,
    private router: Router,
    private eventService : EventsService) { 
      // force route reload whenever params change;
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.event.title="123";    
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // this.activeRoute.params.subscribe(routeParams => {
    //   this.loadUserDetail(routeParams.id);
    // });
     // do something with the parameters
    //  this.loadUserDetail(routeParams.id);

    this.eventService.getSingle(this.id).subscribe(
      (result:any) => {
       this.event=result; 
       console.log(this.event.title);
        
      },
      (error:any) => {
       console.log(error);
       
      },
      () => {
       
      }
    );
  }
   
    // console.log(this.id);
  
}


