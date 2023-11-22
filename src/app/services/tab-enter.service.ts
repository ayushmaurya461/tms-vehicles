import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabEnterService {
  constructor() {}

  // KeyUp Function On input
  keyFunc(
    event: any,
    nextElementId: string,
    nextElementType: string = 'text' || 'date',
    previousElementId: string = '',
    previousElementType: string = 'text' || 'date'
  ) {
    if (event.key == 'Enter' || event.keyCode == 13) {
      if (
        nextElementId &&
        nextElementId != '' &&
        nextElementType &&
        nextElementType != ''
      ) {
        if (nextElementType == 'select') {
          $(event.target).trigger('blur');
          setTimeout(() => {
            $('#' + nextElementId + ' .ngx-select').trigger('focus');
          }, 10);
        } else if (nextElementType == 'dropdown') {
          console.log('Hello');
          $('#' + nextElementId + ' .p-multiselect').trigger('focus');
          $('#' + nextElementId + ' .p-multiselect-trigger').trigger('click');
        } else {
          $('#' + nextElementId).trigger('focus');
        }
      }
    } else if ((event.key == 'Tab' || event.keyCode == 9) && event.shiftKey) {
      if (
        previousElementId &&
        previousElementId != '' &&
        previousElementType &&
        previousElementType != ''
      ) {
        if (previousElementType == 'select') {
          $(event.target).trigger('blur');
          $('#' + previousElementId + ' .ngx-select').trigger('focus');
        } else {
          $('#' + previousElementId).trigger('focus');
        }
      }
    }
  }
  // ===================================================================
}
