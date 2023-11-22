import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TabEnterService } from "src/app/services/tab-enter.service";

@Component({
  selector: "app-vehicle-segments",
  templateUrl: "./vehicle-segments.component.html",
  styleUrls: ["./vehicle-segments.component.css"],
})
export class VehicleSegmentsComponent implements OnInit {
  counterData!: any[];
  // [key: string]: any;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }

  @ViewChild("addSegment") module!: NgForm;

  public mobile: boolean = false;
  public mediaScreenSize: number = 768;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};

  public fields = {
    id: 0,
    segmentName: "",
    remarks: "",
  };

  constructor(public tabEnterService: TabEnterService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    var self = this;

    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sr_no",
        card: 1,
      },
      {
        title: "Segment Name",
        data: "vehicle_segment_name",
        card: 1,
      },
      {
        title: "Remarks",
        card: 0,
        data: "vehicle_segment_remarks",
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
          sr_no: "1",
          vehicle_segment_name: "Car Carrier",
          vehicle_segment_remarks: "For Car Carrier",
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
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$("#addSegment")).modal("toggle");
  }

  editEntry(data: any) {}

  deleteEntry(data: any) {}

  viewDetails(data: any) {}

  checkScreenSize() {
    const width = window.innerWidth;
    width >= this.mediaScreenSize
      ? (this.mobile = false)
      : (this.mobile = true);
  }
}
