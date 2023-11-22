import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { LoadingService } from "src/app/services/loading.service";
import { TabEnterService } from "src/app/services/tab-enter.service";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";

@Component({
  selector: "app-vehicle-target",
  templateUrl: "./vehicle-target.component.html",
})
export class VehicleTargetComponent implements OnInit {
  @ViewChild(DatatableFullComponent) tableFull!: DatatableFullComponent;
  @ViewChild("target") form!: NgForm;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;
  public loading = false;

  public fields: any = {
    id: 0,
    vehicle: "",
    year: "",
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
    target: 0,
  };

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public vehicleOptions = [{ id: "3287463", text: "HRO8932" }];
  public yearOptions = [
    { id: "2012", text: "2012" },
    { id: "2013", text: "2013" },
  ];
  constructor(
    private loader: LoadingService,
    private basictaskService: BasicTasksService,
    public tabEnterService: TabEnterService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.loading = true;
    this.loader.show();
    var self = this;
    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sno",
        width: "50px",
      },
      {
        title: "Vehicle No.",
        data: "vehicle",
        width: "100px",
        card: 1,
      },

      {
        title: "Year",
        data: "year",
        width: "100px",
        card: 0,
      },
      {
        title: "Target",
        data: "target",
        width: "100px",
        card: 0,
      },
    ];

    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection editButton",
        attr: {
          title: "Add",
        },
        card: true,
        action: function () {
          self.addEntry();
        },
      },
    ];

    this.optionData = {
      serverSide: false,
      url: "",
      showBasicDetailsPage: false,
      data: [],
    };

    this.counterData = [
      {
        id: 1,
        title: "All",
        data: "10",
        icon: "ti-layout-grid2",
        colorClass: "bg-info",
      },
      {
        id: 2,
        title: "Unapproved",
        data: "1 | 10",
        icon: "ti-face-sad",
        colorClass: "bg-warning",
      },
      {
        id: 3,
        title: "Approved",
        data: "9 | 10",
        icon: "ti-check-box",
        colorClass: "bg-success",
      },
      {
        id: 4,
        title: "Rejected",
        data: "2 | 10",
        icon: "ti-alert",
        colorClass: "bg-primary",
      },
      {
        id: 5,
        title: "Deactive",
        data: "2 | 10",
        icon: "ti-light-bulb",
        colorClass: "bg-secondary",
      },
      {
        id: 6,
        title: "Deleted",
        data: "2 | 10",
        icon: "ti-close",
        colorClass: "bg-danger",
      },
    ];
  }
  ngAfterViewInit(): void {
    this.basictaskService.highlightRequiredFields();
  }
  addEntry() {
    this.form.resetForm();
    (<any>$("#vehicleTargets")).modal("toggle");
  }

  calculateTarget() {
    this.fields.target =
      this.fields.jan +
      this.fields.feb +
      this.fields.mar +
      this.fields.apr +
      this.fields.may +
      this.fields.jun +
      this.fields.jul +
      this.fields.aug +
      this.fields.sep +
      this.fields.oct +
      this.fields.nov +
      this.fields.dec;
  }

  setValues(value: any, fieldName: string) {
    this.fields[fieldName] = value;
  }

  checkScreenSize() {
    if (window.innerWidth >= 768) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }
}
