import { Component, OnInit } from '@angular/core';
import {  EventsService } from '../../services/events.service';
import {  EventModel } from '../../model/event-model';
import {GlobalComponent} from "../../global-component";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  apiUrl:any;
  events: EventModel[] = [];
  searchText:any;
  constructor(private eventService : EventsService) { }

  ngOnInit(): void {
    this.apiUrl=GlobalComponent.appUrl;
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
