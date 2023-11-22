import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { BodyDetailsComponent } from './body-details/body-details.component';
import { VehicleBrandsComponent } from './vehicle-brands/vehicle-brands.component';
import { VehicleMasterComponent } from './vehicle-master.component';
import { VehicleModelsComponent } from './vehicle-models/vehicle-models.component';
import { VehicleSegmentsComponent } from './vehicle-segments/vehicle-segments.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleMasterComponent,
  },
  {
    path: 'vehicle-segments',
    component: VehicleSegmentsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Vehicle Segments',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'vehicle-models',
    component: VehicleModelsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Vehicle Models',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'vehicle-brands',
    component: VehicleBrandsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Vehicle Brands',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'vehicle-body-details',
    component: BodyDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Vehicle Body Details',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleMasterRoutingModule {}
