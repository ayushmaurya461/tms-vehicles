import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-master",
  templateUrl: "./vehicle-master.component.html",
})
export class VehicleMasterComponent implements OnInit {
  public masterSettings: any = [];

  constructor() {}

  ngOnInit(): void {
    this.masterSettings = [
      {
        id: 1,
        label: "Trailer Details",
        backgroundImage: "assets/img/icon/permission.webp",
        url: "vehicles/vehicle-master/vehicle-body-details",
        titleBackground: "#8575ce",
      },
      {
        id: 2,
        label: "Vehicle Brands",
        backgroundImage: "assets/img/icon/permission.webp",
        url: "vehicles/vehicle-master/vehicle-brands",
        titleBackground: "#8575ce",
      },
      {
        id: 3,
        label: "Vehicle Models",
        backgroundImage: "assets/img/icon/permission.webp",
        url: "vehicles/vehicle-master/vehicle-models",
        titleBackground: "#8575ce",
      },
      {
        id: 4,
        label: "Vehicle Segments",
        backgroundImage: "assets/img/icon/permission.webp",
        url: "vehicles/vehicle-master/vehicle-segments",
        titleBackground: "#8575ce",
      },
    ];
  }
}
