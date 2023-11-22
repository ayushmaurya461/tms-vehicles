import { Injectable } from '@angular/core';
import { UserService } from 'src/app/libraray/user.service';
import { EventService } from 'src/app/services/event.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouteDataService } from 'src/app/services/route-data.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  loading: boolean = false;
  public sidebarWidth: string = 'expand';
  menus: any;

  constructor(
    private routeDataService: RouteDataService,
    private loader: LoadingService,
    private http: HttpService,
    private notification: NotificationService,
    public eventService: EventService,
    public userService: UserService
  ) {}

  fetchMenu() {
    // this.loading = true;
    // this.loader.show();
    // this.menus = [];
    // let requestData: any = {
    //   search_type: 'user',
    //   search_id: this.userService.id,
    //   status: 1,
    // };
    // this.http
    //   .postRequestWithHeaders(
    //     'access-control/module/module-submodule-list',
    //     requestData
    //   )
    //   .subscribe((response: any) => {
    //     console.log(response);
    //     if (response && response.status) {
    //       this.menus = response.response.data;
    //       this.loading = false;
    //       this.loader.hide();
    //     }
    //   });
  }

  closeSidebar(url: string) {
    let data: any = {};
    if (url != '#' && url != null && url != '') {
      this.menus.forEach((menu: any) => {
        if (menu.url == url) {
          data = {
            module: menu.module_id,
            submodule: '',
          };
        }
        let subModule = menu.sub_modules.filter(
          (submodule: any) => url === submodule.url
        );
        if (subModule.length) {
          data = {
            module: menu.module_id,
            submodule: subModule[0].submodule_id,
          };
        }
      });
      this.routeDataService.setRouteData(data);
      $('.sidebar_close_icon i').trigger('click');
    }
  }
}
