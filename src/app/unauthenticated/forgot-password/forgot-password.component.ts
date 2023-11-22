import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/libraray/user.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private router: Router, private http:HttpService, private notification: NotificationService, public userService:UserService ) { }

  ngOnInit(): void {
    if(this.userService.id){
      this.router.navigate(['/dashboard']);
    }
  }

  forgotPassword(f: NgForm) {
    if(f.valid){
      let body:any = {
        "user_name":f.value.username,
        "email":f.value.email
      };
      this.http.postRequest('forgot-password',body).subscribe(
        (response: any) => {
          if(response && response.status){
            this.router.navigate(['auth/login']);
            this.notification.apiSuccess(response);
          }
        },
        (error: any) => {
          this.notification.apiError(error);
        }
      );
    }
  }

}
