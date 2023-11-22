import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ConfirmService } from "src/app/services/confirm.service";
import { HttpService } from "src/app/services/http.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotificationService } from "src/app/services/notification.service";

@Injectable({
  providedIn: "root",
})
export class VehicleDetailsService {
  public tableColumns: any;
  public tableButtons: any;
  public optionData: any;
  public counterData: any;
  private addEntrySubject: Subject<void> = new Subject<void>();
  public addEntry$ = this.addEntrySubject.asObservable();

  constructor(
    private loader: LoadingService,
    private http: HttpService,
    private notification: NotificationService,
    private confirmService: ConfirmService
  ) {
    const self = this;

    this.tableColumns = [
      {
        title: "Vehicle ID",
        data: "vehicle_id",
        card: true,
        width: "80px",
      },
      {
        title: "Vehicle Type",
        data: "vehicle_type",
        card: true,
        width: "100px",
      },
      {
        title: "Vehicle Use Type",
        data: "vehicle_use_type",
        width: "120px",
      },
      {
        title: "Ownership",
        data: "ownership",
        width: "90px",
      },
      {
        title: "Registration No.",
        data: "reg_no",
        width: "130px",
      },
      {
        title: "Registration Date",
        data: "reg_date",
        width: "130px",
      },
      {
        title: "Chassis No",
        data: "chassis_no",
        width: "80px",
      },
      {
        title: "Average With Load",
        data: "avg_with_load",
        width: "140px",
      },
      {
        title: "Average Without Load",
        data: "avg_without_load",
        width: "140px",
      },
      {
        title: "Engine No.",
        data: "engine_number",
        width: "100px",
      },
      {
        title: "Manufacturer",
        data: "brand",
        width: "100px",
      },
      {
        title: "Segment",
        data: "segment",
        card: true,
        width: "80px",
      },
      {
        title: "Model",
        data: "model",
        width: "80px",
      },
      {
        title: "Body Type",
        data: "body_type",
        width: "100px",
      },
      {
        title: "Maufacturing Year",
        data: "mfg_year",
        width: "140px",
      },
      {
        title: "Manual Odometer",
        data: "manual_odometer",
        width: "140px",
      },
      {
        title: "GPS Odometer",
        data: "gps_odometer",
        width: "120px",
      },
      {
        title: "TMS Odometer",
        data: "tms_odometer",
        width: "120px",
      },
      {
        title: "Owner",
        data: "owner",
        card: true,
        width: "120px",
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
      showBasicDetailsPage: false,
      data: [
        {
          vehicle_id: 22606,
          vehicle_type: "truck",
          vehicle_use_type: "commercial",
          ownership: "owned",
          reg_no: "wevkuiwen334",
          reg_date: "13-2-2019",
          owner: "Demo",
          tms_odometer: "789",
          gps_odometer: "7789",
          manual_odometer: "985",
          chassis_no: "787895478",
          avg_with_load: "3.8",
          avg_without_load: "23",
          engine_number: "e78t54n",
          brand: "tata",
          segment: "Car Carrier",
          model: "2019",
          body_type: "TK18",
          mfg_year: "2019",
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
    this.loader.show();
    this.addEntrySubject.next();
    this.loader.hide();
  }

  editEntry(row: any) {}

  async deleteEntry(data: any) {
    if (data.length == 1) {
      if (
        await this.confirmService.confirm("Are You Sure You Want To Delete.")
      ) {
        this.loader.show();
        this.http.postRequestWithHeaders("/", { id: data[0]?.id }).subscribe(
          (response: any) => {
            if (response && response.status) {
              this.loader.hide();
              this.notification.apiSuccess(response);
            } else {
              this.notification.error(
                "Something went wrong, please try after sometime"
              );
            }
          },
          (error: any) => {
            this.loader.hide();
            this.notification.apiError(error);
          }
        );
      }
    } else if (data.length == 0) {
      alert("Please select any entry to delete.");
    } else {
      alert("Only one entry can be deleted at a time.");
    }
  }
}
