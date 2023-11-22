import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { UnauthenticatedComponent } from './unauthenticated.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JoineePersonalDetailsComponent } from './joinee-personal-details/joinee-personal-details.component';

@NgModule({
  declarations: [
    UnauthenticatedComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    JobPostComponent,
    JoineePersonalDetailsComponent,
  ],
  imports: [CommonModule, UnauthenticatedRoutingModule, FormsModule],
})
export class UnauthenticatedModule {}
