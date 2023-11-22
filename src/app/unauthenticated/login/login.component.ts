import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/libraray/user.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public redirectURL: string = '';
  public otp = false;
  public submittedEmail = false;
  public countdown: number = 30;
  private intervalId: any;
  public userId = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private notification: NotificationService,
    public userService: UserService
  ) {
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }
  }

  ngOnInit(): void {
    if (this.userService.id) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(f: NgForm) {
    if (f.valid) {
      this.loading = true;
      let url = 'login';
      let body: any = {};
      if (!this.otp) {
        body = {
          user_name: f.value.username,
          password: f.value.password,
        };
      } else {
        body = {
          user_id: this.userId,
          otp: f.value.password,
        };
        url = 'verify-otp';
      }
      this.http.postRequest(url, body).subscribe(
        (response: any) => {
          if (response && response.status) {
            this.userService.id = response.response.data.id;
            this.userService.userType = response.response.data.user_type;
            this.userService.userName = response.response.data.user_name;
            this.userService.fullName = response.response.data.user_name;
            this.userService.token = response.response.data.token;
            this.userService.companyId = response.response.data.company_id;
            this.userService.companyCode = response.response.data.company_code;
            this.userService.subCompanyCode =
              response.response.data.subcompany_code;
            this.userService.accessList = response.response.data.access_list;
            this.userService.branchList = response.response.data.branch_list;
            this.userService.userBranch = response.response.data.user_branch;
            this.userService.fromYear = response.response.data.from_year;
            this.userService.fiscalYear = response.response.data.fiscal_year;
            this.userService.save();
            this.backToPreviousPage();
            this.notification.apiSuccess(response);
          }
          this.loading = false;
        },
        (error: any) => {
          this.notification.apiError(error);
          this.loading = false;
        }
      );
    }
  }

  submitEmail(f: NgForm) {
    if (!this.submittedEmail) {
      const body = {
        user_name: f.value.username,
      };
      this.http.postRequestWithHeaders('request-otp', body).subscribe((res) => {
        this.userId = res.response.data.user_id;
        console.log(this.userId);

        this.notification.success('OPT sent to registered Email ID');
      });
    }
    this.submittedEmail = true;
    this.startCountdown();
  }

  backToPreviousPage() {
    if (this.redirectURL) {
      this.router
        .navigateByUrl(this.redirectURL)
        .catch(() => this.router.navigate(['/dashboard']));
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  resendOtp(f: NgForm) {
    this.countdown = 30;
    this.startCountdown();
    const body = {
      user_name: f.value.username,
    };
    this.http.postRequestWithHeaders('request-otp', body).subscribe((res) => {
      this.userId = res.response.data.user_id;
    });
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.stopCountdown();
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.intervalId);
  }
}
