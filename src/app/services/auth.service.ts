import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../libraray/user.service';
import { HttpService } from './http.service';
import { LoadingService } from './loading.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loading: boolean = false;

  constructor(
    private http: HttpService,
    private notification: NotificationService,
    private loader: LoadingService,
    private router: Router,
    public userService: UserService
  ) {}

  getAuthStatus() {
    if (this.userService.id) {
      return true;
    }
    return false;
  }

  logout() {
    this.userService.clean();
    this.router.navigate(['/auth/login']);
  }

  varifyToken(userId: string) {
    let requestData = {
      user_id: userId,
    };
    return this.http
      .postRequestWithHeaders('check-login', requestData)
      .subscribe(
        (response: any) => {
          if (response && response.status) {
            this.loading = false;
            this.loader.hide();
            return true;
          } else {
            return false;
          }
        },
        (error: any) => {
          this.loading = false;
          this.loader.hide();
          this.notification.apiError(error);
          return false;
        }
      );
  }
}
