import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../libraray/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionCheckService {

  private permissionStatus:boolean = false;

  constructor(private router:Router,private activatedRoute: ActivatedRoute, private userService: UserService) { }

  async checkPermission(){
    await this.checkAccessPermission();
  }
  async checkAccessPermission(){
    return await this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route:any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route:any) => route.outlet === 'primary'),
      mergeMap((route:any) => route.data)
     )
     .subscribe((event:any) => {
       let accessList = this.userService.accessList;
       let permissions = accessList.filter((obj: any)=>(obj.module_slug==event.module && obj.submodule_slug==event.subModule));
       if(permissions.length){

        if(event.action == 'view' && permissions[0].view == 1) { this.permissionStatus = true; return true; }
        if(event.action == 'add' && permissions[0].add == 1) { this.permissionStatus = true; return true; }
        if(event.action == 'edit' && permissions[0].edit == 1) { this.permissionStatus = true; return true; }
        if(event.action == 'delete' && permissions[0].delete == 1) { this.permissionStatus = true; return true; }

        this.permissionStatus = false;
        return false;

       }else{
        this.permissionStatus = false;
        return false;
       }
     });

  }

}
