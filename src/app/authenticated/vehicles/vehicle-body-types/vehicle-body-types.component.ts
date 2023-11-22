import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { AddVehicleBodyTypeComponent } from "./add-vehicle-body-type/add-vehicle-body-type.component";

@Component({
  selector: "app-vehicle-body-types",
  templateUrl: "./vehicle-body-types.component.html",
  styleUrls: ["./vehicle-body-types.component.css"],
})
export class VehicleBodyTypesComponent implements OnInit {
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }

  @ViewChild(AddVehicleBodyTypeComponent) addVehicleBody: any;
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public counterData: any;

  constructor() {}

  ngOnInit(): void {
    var self = this;
    this.checkScreenSize();

    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sr_no",
      },
      {
        title: "Name",
        data: "vehicle_body_name",
        card: 1,
      },
      {
        title: "Body Type",
        data: "vehicle_body_type",
        card: 1,
        //Open/closed
      },
      {
        title: "Applicable For",
        data: "vehicle_body_applicable",
        //Own or hired fleet, own will be listed for own fleet only, rest for all
      },
      {
        title: "Segment",
        data: "vehicle_body_segment",
        card: 1,
        //Car carrier/container/open market/express/taxi/tankers etc.
      },
      {
        title: "Attachment",
        data: "vehicle_body_attachment",
      },
      {
        title: "Tyres",
        data: "vehicle_body_tyres",
      },
      {
        title: "Remarks",
        data: "vehicle_body_remarks",
      },
      {
        title: "Status",
        data: "vehicle_body_status",
        card: 1,
      },
    ];
    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection addButton",
        attr: {
          title: "Add Vehicle Body",
        },
        title: "Add",
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
          title: "Edit Vehicle Body",
        },
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
          title: "Delete Vehicle Body",
        },
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
      url: "",
      showBasicDetailsPage: true,
      data: [
        {
          sr_no: "1",
          vehicle_body_name: "TR8",
          vehicle_body_type: "Closed",
          vehicle_body_applicable: "Own Fleet",
          vehicle_body_segment: "Car Carrier",
          vehicle_body_attachment: "Yes",
          vehicle_body_tyres: "9",
          vehicle_body_remarks: "Test",
          vehicle_body_status: "Active",
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

  addEntry() {
    this.addVehicleBody.addEntry();
  }

  editEntry(data: any) {
    this.addVehicleBody.editEntry();
  }

  deleteEntry(data: any) {}

  viewDetails(data: any) {}

  checkScreenSize() {
    const width = window.innerWidth;
    width >= this.mediaScreenSize
      ? (this.mobile = false)
      : (this.mobile = true);
  }
}
