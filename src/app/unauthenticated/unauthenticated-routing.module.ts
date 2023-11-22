import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JoineePersonalDetailsComponent } from './joinee-personal-details/joinee-personal-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'reset-password/:token/:user_name',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'job-post/:search',
    component: JobPostComponent,
    data: {
      title: 'Job Post',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'joinee-personal-details',
    component: JoineePersonalDetailsComponent,
    data: {
      title: 'Joinee Personal Details',
      description: 'Joinee Details Component',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthenticatedRoutingModule {}
