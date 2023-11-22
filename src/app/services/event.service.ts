import { Injectable } from '@angular/core';

// declare var Event:any;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  public event: any;

  __constructor() { }

  emit(eventName: string, data:any=[]) {
    this.event = new Event(eventName, data);
    window.dispatchEvent(this.event);
  }

  listen(callback: any, name:string) {
    window.addEventListener(name, callback, false);
  }


}

