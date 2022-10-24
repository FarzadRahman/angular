import { Component, OnInit } from '@angular/core';
import {  EventsService } from '../../services/events.service';
import {  EventModel } from '../../model/event-model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  events: EventModel[] = [];
  constructor(private eventService : EventsService) { }

  ngOnInit(): void {
    this.eventService.getAll().subscribe(
      (result:any) => {
       this.events=result; 
       console.log(this.events);
        
      },
      (error:any) => {
       console.log(error);
       
      },
      () => {
       
      }
    );
  }

}
