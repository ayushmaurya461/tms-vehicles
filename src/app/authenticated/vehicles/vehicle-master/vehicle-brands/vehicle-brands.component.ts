//Yogesh Component and services start
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { ConfirmService } from "src/app/services/confirm.service";
import { EventService } from "src/app/services/event.service";
import { HttpService } from "src/app/services/http.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotificationService } from "src/app/services/notification.service";
import { TabEnterService } from "src/app/services/tab-enter.service";
import { DatatableFullComponent } from "../../../shared/datatable-full/datatable-full.component";

@Component({
  selector: "app-vehicle-brands",
  templateUrl: "./vehicle-brands.component.html",
  styleUrls: ["./vehicle-brands.component.css"],
})
export class VehicleBrandsComponent implements OnInit {
  @ViewChild("addVehicleBrand") module!: NgForm;
  @ViewChild(DatatableFullComponent) tableFull!: DatatableFullComponent;

  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;
  public loading: boolean = false;

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public countryOptions: any = [];
  public fields: any = {
    id: "",
    companyType: "",
    logo: "",
    name: "",
    origin: "",
    Remark: "",
  };

  public companyTypeOptions: any = [];

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
        title: "Logo",
        data: "logo",
        card: 0,
      },
      {
        title: "Name",
        data: "name",
        card: 1,
      },
      {
        title: "Status",
        data: "status",
        card: 1,
      },
      {
        title: "Remark",
        data: "remark",
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
      showBasicDetailsPage: false,
      data: [
        {
          sr_no: "1",
          logo: "Logo",
          name: "Tata",
          status: "Active",
          remark: "Best Indian Brand",
        },
        {
          sr_no: "2",
          logo: "Logo",
          name: "Mercedes",
          status: "Active",
          remark: "Best Indian Brand",
        },
        {
          sr_no: "1",
          logo: "Logo",
          name: "Suzuki",
          status: "Active",
          remark: "Best Indian Brand",
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
    this.http.getCountriesList().subscribe(
      (response: any) => {
        if (response && response.status) {
          var countries: any = [];
          response.response.forEach((country: any) => {
            let data = { id: country.id, text: country.name };
            countries.push(data);
          });
          this.countryOptions = countries;
          this.loading = false;
          this.loader.hide();
        }
      },
      (error: any) => {
        this.loading = false;
        this.loader.hide();
        this.notification.apiError(error);
      }
    );
    this.http.getCompanyTypeList().subscribe(
      (response: any) => {
        if (response && response.status) {
          var company_types: any = [];
          response.response.forEach((ctype: any) => {
            let data = { id: ctype.id, text: ctype.name };
            company_types.push(data);
          });
          this.companyTypeOptions = company_types;
          this.loading = false;
          this.loader.hide();
        }
      },
      (error: any) => {
        this.loading = false;
        this.loader.hide();
        this.notification.apiError(error);
      }
    );
  }

  ngAfterViewInit() {
    this.loading = false;
    this.loader.hide();
    this.basicTaskService.highlightRequiredFields();
  }

  setValues(data: any, fieldName: string) {
    this.fields[fieldName] = data;
  }

  saveDetails(data: any) {
    console.log(data.value);
  }

  addEntry() {
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$("#addVehicleBrand")).modal("toggle");
  }

  editEntry(data: any) {
    if (data.length == 1) {
      this.module.resetForm();
      this.loading = true;
      this.loader.show();
      this.http
        .postRequestWithHeaders("access-control/module/get", {
          id: data[0]?.id,
        })
        .subscribe(
          (response: any) => {
            if (response && response.status) {
              let data = response.response.data;
              this.fields.id = data.id;
              this.fields.name = data.name;
              this.fields.altName = data.alternate_name;
              this.fields.url = data.url;
              this.fields.icon = data.icon;
              this.fields.sortingOrder = data.sort_order;
              this.fields.static = data.static;
              this.fields.tmsadminView = data.tmsadmin_view;
              this.fields.superadminView = data.superadmin_view;
              this.fields.adminView = data.admin_view;
              (<any>$("#addModule")).modal("toggle");
              this.loading = false;
              this.loader.hide();
            } else {
              this.notification.error(
                "Something went wrong, please try after sometime"
              );
            }
          },
          (error: any) => {
            this.loading = false;
            this.loader.hide();
            this.notification.apiError(error);
          }
        );
    } else if (data.length == 0) {
      alert("Please select any entry to edit.");
    } else {
      alert("Only one entry can be edited at a time.");
    }
  }

  async deleteEntry(data: any) {
    if (data.length == 1) {
      if (
        await this.confirmService.confirm("Are You Sure You Want To Delete.")
      ) {
        this.loader.show();
        this.http
          .postRequestWithHeaders("access-control/module/delete", {
            id: data[0]?.id,
          })
          .subscribe(
            (response: any) => {
              if (response && response.status) {
                this.tableFull.reloadTable();
                this.loader.hide();
                this.notification.apiSuccess(response);
                let config = {
                  alertType: "success",
                  buttonText: "OK",
                  alertMessage:
                    "Any changes made will be reflected only after Logging again.",
                };
                alert(config);
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

  viewDetails(data: any) {
    if (data.length == 1 || data.length == undefined) {
      (<any>$("#viewDemoPage")).modal("toggle");
    } else if (data.length == 0) {
      alert("Please select any entry to View Details.");
    } else {
      alert("Only one entry can be View at a time.");
    }
  }

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }

  checkScreenSize() {
    const width = window.innerWidth;
    width >= this.mediaScreenSize
      ? (this.mobile = false)
      : (this.mobile = true);
  }
}
