import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { LoadingService } from "src/app/services/loading.service";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";
import { TabEnterService } from "src/app/services/tab-enter.service";

@Component({
  selector: "app-vehicle-average-log",
  templateUrl: "./vehicle-average-log.component.html",
  styleUrls: ["./vehicle-average-log.component.css"],
})
export class VehicleAverageLogComponent implements OnInit, AfterViewInit {
  @ViewChild(DatatableFullComponent) tableFull: any;
  @ViewChild("averageLogs") form!: NgForm;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;
  public loading = false;

  public fields: any = {
    id: 0,
    vehicle: "",
    effectiveDate: "",
    avgWithLoad: "",
    avgWithoutLoad: "",
    avgWithOverload: "",
  };

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public vehicleOptions = [{ id: "3287463", text: "HRO8932" }];

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
        title: "Body Type",
        data: "bodyType",
        width: "100px",
        card: 0,
      },
      {
        title: "Model",
        data: "model",
        width: "100px",
        card: 0,
      },
      {
        title: "Effective Date",
        data: "effDate",
        width: "100px",
        card: 0,
      },
      {
        title: "Average With Load",
        data: "avgLoad",
        width: "140px",
        card: 0,
      },
      {
        title: "Average Without Load",
        data: "avgEmpty",
        width: "160px",
        card: 0,
      },
      {
        title: "Average With Overload",
        data: "avgOverload",
        width: "160px",
        card: 0,
      },
      {
        title: "Username",
        data: "username",
        width: "100px",
        card: 0,
      },
      {
        title: "Created Date",
        data: "createdDate",
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
    (<any>$("#vehicleAverage")).modal("toggle");
  }

  setVehicle(value: any) {
    this.fields.vehicle = value;
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }
}
