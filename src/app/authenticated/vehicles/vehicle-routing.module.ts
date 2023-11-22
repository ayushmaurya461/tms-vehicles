import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth.guard";
import { VehicleBodyAssociationComponent } from "./vehicle-body-association/vehicle-body-association.component";
import { VehicleBodyTypesComponent } from "./vehicle-body-types/vehicle-body-types.component";
import { VehicleDetailsComponent } from "./vehicle-details/vehicle-details.component";
import { VehicleLaneComponent } from "./vehicle-lane/vehicle-lane.component";
import { UpdateOdometerComponent } from "./update-odometer/update-odometer.component";
import { VehicleAverageLogComponent } from "./vehicle-average-log/vehicle-average-log.component";
import { VehicleTargetComponent } from "./vehicle-target/vehicle-target.component";

const routes: Routes = [
  { path: "", redirectTo: "vehicle", pathMatch: "full" },
  {
    path: "vehicle-lane",
    component: VehicleLaneComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Lane",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicle",
    component: VehicleDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Details",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "update-odometer",
    component: UpdateOdometerComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Update Odometer",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicle-body-association",
    component: VehicleBodyAssociationComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Body Association",
      description: "Description Meta Tag Content",
    },
  },

  {
    path: "vehicle-targets",
    component: VehicleTargetComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Targets",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicle-average-logs",
    component: VehicleAverageLogComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Average Logs",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicle-body-types",
    component: VehicleBodyTypesComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Body Types",
      description: "Description Meta Tag Content",
    },
  },
  {
    path: "vehicle-master",
    loadChildren: () =>
      import("./vehicle-master/vehicle-master-routing.module").then(
        (m) => m.VehicleMasterRoutingModule
      ),
    canActivate: [AuthGuard],
    data: {
      title: "Vehicle Master",
      description: "Description Meta Tag Content",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
