import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DatatableFullComponent } from "../../../shared/datatable-full/datatable-full.component";
import { AddVehicleBodyDetailsComponent } from "./add-vehicle-body-details/add-vehicle-body-details.component";

@Component({
  selector: "app-body-details",
  templateUrl: "./body-details.component.html",
  styleUrls: ["./body-details.component.css"],
})
export class BodyDetailsComponent implements OnInit, AfterViewInit {
  // [key: string]: any;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }

  public mobile: boolean = false;
  public mediaScreenSize: number = 768;

  @ViewChild(DatatableFullComponent) tableFull: any;
  @ViewChild(AddVehicleBodyDetailsComponent) addVehicleBodyDetails: any;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData = {};
  public counterData: any = [];

  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();

    var self = this;

    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sr_no",
        card: 0,
        width: "50px",
      },
      {
        title: "Body Type",
        data: "body_type",
        card: 1,
      },
      {
        title: "No. of Axle",
        data: "no_of_axle",
        card: 1,
      },
      {
        title: "Body No.",
        data: "body_no",
        card: 1,
      },
      {
        title: "Chassis No.",
        data: "chassis_no",
        card: 0,
      },
      {
        title: "No. of Tyres",
        data: "no_of_tyres",
        card: 0,
      },
      {
        title: "Odometer",
        data: "odometer",
        card: 0,
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
      showBasicDetailsPage: true,
      data: [
        {
          sr_no: 1,
          body_type: "ABC",
          chassis_no: 5628,
          no_of_tyres: 10,
          odometer: 323,
          no_of_axle: 2,
          body_no: 32232,
          manufacturer_name: "DEFGHI",
        },
        {
          sr_no: 1,
          body_type: "ABC",
          chassis_no: 5628,
          no_of_tyres: 10,
          odometer: 323,
          no_of_axle: 2,
          body_no: 32232,
          manufacturer_name: "DEFGHI",
        },
        {
          sr_no: 1,
          body_type: "ABC",
          chassis_no: 5628,
          no_of_tyres: 10,
          odometer: 323,
          no_of_axle: 2,
          body_no: 32232,
          manufacturer_name: "DEFGHI",
        },
        {
          sr_no: 1,
          body_type: "ABC",
          chassis_no: 5628,
          no_of_tyres: 10,
          odometer: 323,
          no_of_axle: 2,
          body_no: 32232,
          manufacturer_name: "DEFGHI",
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

  ngAfterViewInit(): void {
    this.checkScreenSize();
  }
  addEntry() {
    this.addVehicleBodyDetails.addEntry();
  }

  editEntry(data: any) {}

  deleteEntry(data: any) {}

  viewDetails(event: any) {}

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }

  // checkScreenSize() {
  //   if (typeof window !== 'undefined') {
  //     const width = window.innerWidth;
  //     width >= this.mediaScreenSize
  //       ? (this.mobile = false)
  //       : (this.mobile = true);
  //   }
  // }

  checkScreenSize() {
    const width = $(window).width();
    if (width !== undefined) {
      width >= this.mediaScreenSize
        ? (this.mobile = false)
        : (this.mobile = true);
    }
  }
}
