import { Component, OnInit, ViewChild } from "@angular/core";
import { AddVehicleBodyAssociationComponent } from "./add-vehicle-body-association/add-vehicle-body-association.component";

@Component({
  selector: "app-vehicle-body-association",
  templateUrl: "./vehicle-body-association.component.html",
  styleUrls: ["./vehicle-body-association.component.css"],
})
export class VehicleBodyAssociationComponent implements OnInit {
  @ViewChild(AddVehicleBodyAssociationComponent) formComponent: any;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData = {};
  public counterData: any = [];

  constructor() {}

  ngOnInit(): void {
    var self = this;
    this.tableColumns = [
      {
        title: "Body No.",
        data: "body_no",
        card: 1,
      },
      {
        title: "Vehicle No.",
        data: "vehicle_no",
        card: 1,
      },
      {
        title: "Assign Date",
        card: 0,
        data: "assign_date",
      },
      {
        title: "Unassign Date",
        card: 0,
        data: "unassign_date",
      },
      {
        title: "User",
        data: "user",
        card: 1,
      },
    ];
    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection addButton",
        attr: {
          title: "Add Vehicle Segment",
        },
        card: false,
        cardHead: false,
        class: "card-head-btns font-weight-bold",
        action: function () {
          self.addEntry();
        },
      },
      {
        text: '<i class="ti-pencil"></i>',
        className: "buttons-collection editButton",
        attr: {
          title: "Edit Vehicle Segment",
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
          title: "Delete Vehicle Segment",
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
      url: "",
      showBasicDetailsPage: true,
      data: [
        {
          id: 0,
          body_no: "65464",
          vehicle_no: "342",
          assign_date: "12-02-03",
          unassign_date: "12-03-23",
          user: "z-boc",
        },
        {
          id: 1,
          body_no: "34324",
          vehicle_no: "342",
          assign_date: "12-02-03",
          unassign_date: "12-03-23",
          user: "admin",
        },
        {
          id: 2,
          body_no: "4326444",
          vehicle_no: "342",
          assign_date: "12-02-03",
          unassign_date: "12-03-23",
          user: "tms_live",
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

  viewDetails(data: any) {}

  addEntry() {
    this.formComponent.addEntry();
  }

  editEntry(data: any) {}

  deleteEntry(data: any) {}

  counterClickFunction(data: any) {}
}
