import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { UserService } from '../libraray/user.service';
import { AuthService } from './auth.service';
import { PermissionCheckService } from './permission-check.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private permissionCheckService: PermissionCheckService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isAuthenticated = this.authService.getAuthStatus();
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login'], {
        queryParams: { redirectURL: state.url },
      });
      return false;
    } else {
      this.router.events
        .pipe(
          filter((event: any) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route: any) => {
            while (route.firstChild) route = route.firstChild;
            return route;
          }),
          filter((route: any) => route.outlet === 'primary'),
          mergeMap((route: any) => route.data),
          take(1)
        )
        .subscribe((event: any) => {
          // let accessList = this.userService.accessList;
          // let permissions = accessList.filter(
          //   (obj: any) =>
          //     obj.module_id == event.additionalData?.module &&
          //     obj.submodule_id == event.additionalData?.submodule
          // );
          // if (permissions.length && permissions[0].view != 0) {
          //   return true;
          // } else {
          //   this.router.navigate(['not-allowded']);
          //   return false;
          // }
        });
      return true;
    }
  }
}
