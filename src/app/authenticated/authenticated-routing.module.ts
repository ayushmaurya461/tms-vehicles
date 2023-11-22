import { Injectable, NgModule } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { ProfileScreenComponent } from "./shared/profile-screen/profile-screen.component";
import { RouteDataService } from "../services/route-data.service";

@Injectable({
  providedIn: "root",
})
export class AdditionalDataResolver implements Resolve<any> {
  constructor(private routeDataService: RouteDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.routeDataService.getRouteData();
  }
}

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "vehicles" },
  {
    path: "profile",
    component: ProfileScreenComponent,
    data: {
      title: "Profile",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "profile/:id/:type",
    component: ProfileScreenComponent,
    data: {
      title: "Profile",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "profile/:id",
    component: ProfileScreenComponent,
    data: {
      title: "Profile",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicles",
    loadChildren: () =>
      import("./vehicles/vehicle-routing.module").then(
        (m) => m.VehicleRoutingModule
      ),
  },

  {
    path: "assets",
    loadChildren: () =>
      import("./documents/documents-routing.module").then(
        (m) => m.DocumentRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}
