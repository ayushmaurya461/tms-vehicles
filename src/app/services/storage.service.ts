import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public prefix = 'tms_';

  constructor() { }

  public get(key: string) {
    return localStorage.getItem(this.prefix + key);
  }

  public set(key: string, value: string) {
     localStorage.setItem(this.prefix + key, value);
  }

  public remove(key: string) {
     localStorage.removeItem(this.prefix + key);
  }

  public clear() {
    return localStorage.clear();
  }


}
