import { Injectable } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FingService {

  constructor(private storage: StorageService) { }

  async create() {

    const fpPromise = FingerprintJS.load();

    const deviceId = await fpPromise
    .then(fp => fp.get())
    .then(result => {
      return  result.visitorId;
    });

    this.storage.set('deviceId', deviceId);

  }

}
