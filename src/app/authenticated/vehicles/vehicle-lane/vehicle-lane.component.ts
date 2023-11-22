import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { ConfirmService } from "src/app/services/confirm.service";
import { EventService } from "src/app/services/event.service";
import { HttpService } from "src/app/services/http.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotificationService } from "src/app/services/notification.service";
import { TabEnterService } from "src/app/services/tab-enter.service";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";

@Component({
  selector: "app-vehicle-lane",
  templateUrl: "./vehicle-lane.component.html",
  styleUrls: ["./vehicle-lane.component.css"],
})
export class VehicleLaneComponent implements OnInit {
  [key: string]: any;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }

  public mobile: boolean = false;
  public mediaScreenSize: number = 768;

  @ViewChild("vehicleLane") module!: NgForm;
  @ViewChild(DatatableFullComponent) tableFull: any;

  public loading: boolean = false;
  public errors: any = [];

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public laneOptions: any = [
    { id: 0, text: "Right Lane" },
    { id: 1, text: "Left Lane" },
    { id: 2, text: "South Lane" },
  ];
  public vehicleOptions: any = [
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
    { id: 432, text: "HHFD6476" },
  ];

  public fields: any = {
    id: "",
    lane: "",
    vehicleNo: "",
    date: "",
  };

  constructor(
    public tabEnterService: TabEnterService,
    private loader: LoadingService,
    public basicTaskService: BasicTasksService,
    private http: HttpService,
    private notification: NotificationService,
    public confirmService: ConfirmService,
    public eventService: EventService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.loading = false;
    this.loader.show();
    var self = this;

    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sr_no",
        card: 0,
        width: "50px",
      },
      {
        title: "Vehicle No.",
        data: "vehicle_no",
        card: 1,
      },
      {
        title: "Vehicle Lane",
        data: "vehicle_lane",
        card: 1,
      },
      {
        title: "Date",
        data: "date",
        card: 1,
      },
    ];
    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection AddButton",
        attr: {
          title: "Add New",
        },
        card: false,
        cardHead: true,
        class: "card-head-btns font-weight-bold",
        action: function () {
          self.addEntry();
        },
      },
      {
        text: '<i class="ti-pencil"></i>',
        className: "buttons-collection editButton",
        attr: {
          title: "Update",
        },
        title: "Edit",
        class: "btn btn-success card-btns",
        card: true,
        cardHead: false,
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
          self.editEntry(rows);
        },
      },
      {
        text: '<i class="ti-trash"></i>',
        className: "buttons-collection deleteButton",
        attr: {
          title: "Delete",
        },
        title: "Delete",
        card: true,
        cardHead: false,
        class: "btn btn-danger card-btns",
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
          self.deleteEntry(rows);
        },
      },
      {
        text: '<i class="ti-filter">',
        attr: {
          title: "Column Visibility",
          id: "exportBtn",
        },
        extend: "colvis",
      },
    ];
    this.optionData = {
      serverSide: false,
      url: "vehicle-table",
      showBasicDetailsPage: false,
      data: [
        {
          sr_no: "1",
          vehicle_no: "HRO48394",
          vehicle_lane: "Left",
          date: "12-03-12",
        },
        {
          sr_no: "4",
          vehicle_no: "HRO48394",
          vehicle_lane: "Left",
          date: "12-03-12",
        },
        {
          sr_no: "3",
          vehicle_no: "HRO48394",
          vehicle_lane: "Left",
          date: "12-03-12",
        },
        {
          sr_no: "2",
          vehicle_no: "HRO48394",
          vehicle_lane: "Left",
          date: "12-03-12",
        },
      ],
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

  ngAfterViewInit() {
    this.loading = false;
    this.loader.hide();
    //Yogesh not to alter ends

    // Yogesh form auto focus starts
    $("#addVehicleBrand").on("shown.bs.modal", function (e) {
      setTimeout(() => {
        $("#addVehicleBrand #brandName").focus();
      }, 500);
    });
  }

  filterData() {
    // this.module.resetForm();
    this.fields.id = 0;
    (<any>$("#filterData")).modal("toggle");
  }
  addEntry() {
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$("#AddVehicleLane")).modal("toggle");
  }

  editEntry(data: any) {}

  async deleteEntry(data: any) {}

  setValue(fieldName: string, value: any) {
    this.fields[fieldName] = value;
  }

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }

  saveDetails(data: any) {
    console.log(data);
  }

  checkScreenSize() {
    const width = window.innerWidth;
    width >= this.mediaScreenSize
      ? (this.mobile = false)
      : (this.mobile = true);
  }
}
