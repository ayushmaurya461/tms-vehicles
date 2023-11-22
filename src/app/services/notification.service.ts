import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../libraray/user.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifier: NotifierService;

  constructor(
    public notifierService: NotifierService,
    private router: Router,
    public userService: UserService
  ) {
    this.notifier = notifierService;
  }

  public success(message: string) {
    this.notifier.notify('success', message);
  }

  public apiSuccess(response: any) {
    this.notifier.notify('success', response.response.description);
  }

  public error(message: string) {
    this.notifier.notify('error', message);
  }

  public apiError(error: any) {
    let errors = error.error;
    if (error.status == 0 || error.status == '0') {
      this.notifier.notify('error', error.statusText);
    } else if (
      (error.status == 401 || error.status == '401') &&
      !errors.error?.description
    ) {
      this.notifier.notify('error', 'Session Expired, Please login again.');
      this.userService.clean();
      this.router.navigate(['/auth/login']);
    } else {
      if (errors.error.fields) {
        let fields = errors.error.fields;
        Object.keys(fields).forEach((field: any) => {
          fields[field].forEach((errorMessage: string) => {
            this.notifier.notify('error', errorMessage);
          });
        });
      } else {
        this.notifier.notify('error', errors.error.description);
      }
    }
  }
}
