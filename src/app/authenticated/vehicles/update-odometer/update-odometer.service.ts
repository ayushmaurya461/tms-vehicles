import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UpdateOdometerService {
  private editEntrySubject = new Subject<any>();
  public editEntry$ = this.editEntrySubject.asObservable();
  public counterData: any;
  public tableColumns: any;
  public tableButtons: any;
  public optionData: any;

  constructor() {
    var self = this;
    this.tableColumns = [
      { title: "Sr. No.", data: "sno", width: "30px" },
      { title: "Vehicle No.", data: "vehicle", width: "100px", card: 1 },
      { title: "Odometer", data: "odometer", width: "100px", card: 1 },
    ];
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
    this.optionData = {
      serverSide: false,
      url: "",
      showBasicDetailsPage: false,
      data: [],
    };
    this.tableButtons = [
      {
        text: '<i class="ti-pencil"></i>',
        className: "buttons-collection editButton",
        attr: {
          title: "Update/Edit",
        },
        card: true,
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
          self.editEntrySubject.next(rows);
        },
      },
    ];
  }
}
