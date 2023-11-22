import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentStateService {
  private currentData = new BehaviorSubject<any>('');

  getData() {
    return this.currentData.asObservable();
  }

  setData(value: any) {
    const val: any = [];
    val.push(value);
    return this.currentData.next(val);
  }
}
