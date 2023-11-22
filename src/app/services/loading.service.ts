import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  public show() {
    $('.loader-wrapper').show();
  }

  public hide() {
    $('.loader-wrapper').hide();
  }
}
