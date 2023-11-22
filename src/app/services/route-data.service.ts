import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteDataService {
  private routeData: any;

  setRouteData(data: any) {
    this.routeData = data;
  }

  getRouteData() {
    return this.routeData;
  }
}
