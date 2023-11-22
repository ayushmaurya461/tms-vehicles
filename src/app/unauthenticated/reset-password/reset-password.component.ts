import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/libraray/user.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public passwordValue:string = '';
  public confirmPasswordValue:string = '';
  public passwordMatch:boolean = false;
  constructor( private _activatedRoute: ActivatedRoute, private router: Router, private http:HttpService, private notification: NotificationService, public userService:UserService ) { }

  ngOnInit(): void {
    if(this.userService.id){
      this.router.navigate(['/dashboard']);
    }
  }

  resetPassword(f: NgForm) {
    if(f.valid){
      let body:any = {
        "token": this._activatedRoute.snapshot.paramMap.get('token'),
        "user_name": this._activatedRoute.snapshot.paramMap.get('user_name'),
        "password":f.value.password,
        "password_confirmation":f.value.confirmPassword
      };
      this.http.postRequest('reset-password',body).subscribe(
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

  passwordMatchIdentifier(){
    if( this.passwordValue != this.confirmPasswordValue ){
      this.passwordMatch = false;
    }else{
      this.passwordMatch = true;
    }
  }

}
