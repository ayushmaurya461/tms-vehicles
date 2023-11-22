import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckScreenSize {
  private mobile = new BehaviorSubject<boolean>(false);
  mobile$ = this.mobile.asObservable();

  updateMobileValue(value: boolean) {
    this.mobile.next(value);
  }
}
