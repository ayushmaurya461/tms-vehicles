import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { AuthGuard } from './services/auth.guard';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';
import { JobPostComponent } from './unauthenticated/job-post/job-post.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    loadChildren: () =>
      import('./authenticated/authenticated.module').then(
        (m) => m.AuthenticatedModule
      ),
  },
  {
    path: 'auth',
    component: UnauthenticatedComponent,
    loadChildren: () =>
      import('./unauthenticated/unauthenticated.module').then(
        (m) => m.UnauthenticatedModule
      ),
  },
  {
    path: 'job-post',
    component: JobPostComponent,
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
