import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { AddVehicleDetailsComponent } from "./add-vehicle-details/add-vehicle-details.component";
import { Router } from "@angular/router";
import { VehicleDetailsService } from "./vehicle-details.service";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";

@Component({
  selector: "app-vehicle-details",
  templateUrl: "./vehicle-details.component.html",
})
export class VehicleDetailsComponent implements OnInit {
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  @ViewChild(AddVehicleDetailsComponent)
  private vehicleDetails!: AddVehicleDetailsComponent;
  @ViewChild(DatatableFullComponent)
  private tableFull!: DatatableFullComponent;

  public mobile: boolean = false;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public counterData: any;

  constructor(
    private router: Router,
    private operations: VehicleDetailsService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.tableColumns = this.operations.tableColumns;
    this.tableButtons = this.operations.tableButtons;
    this.optionData = this.operations.optionData;
    this.counterData = this.operations.counterData;

    this.operations.addEntry$.subscribe(() => {
      this.vehicleDetails.addEntry();
    });
  }

  viewDetails(data: any) {
    console.log(data);
    const id = data?.vehicle_id;
    const type = "vehicle";
    this.router.navigate(["profile", id, type]);
  }

  addEntry(): void {
    this.vehicleDetails.addEntry();
  }

  editEntry(data: any): void {
    this.vehicleDetails.editEntry(data);
  }

  private checkScreenSize() {
    this.mobile = window.innerWidth >= 768 ? false : true;
  }

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }
}
