import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import{ GlobalComponent } from '../global-component';


@Injectable({
  providedIn: 'root'
})


export class EventsService {

  

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(GlobalComponent.APIUrl+'events');
  }

  getSingle(id:number): Observable<any> {
    return this.http.get<any>(GlobalComponent.APIUrl+'event/'+id);
  }

  
}
