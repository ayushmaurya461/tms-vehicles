//Yogesh Component and services start
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { ConfirmService } from "src/app/services/confirm.service";
import { EventService } from "src/app/services/event.service";
import { HttpService } from "src/app/services/http.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotificationService } from "src/app/services/notification.service";
import { TabEnterService } from "src/app/services/tab-enter.service";
import { DatatableFullComponent } from "../../../shared/datatable-full/datatable-full.component";
//Yogesh component and services end

@Component({
  selector: "app-vehicle-models",
  templateUrl: "./vehicle-models.component.html",
  styleUrls: ["./vehicle-models.component.css"],
})
export class VehicleModelsComponent implements OnInit {
  @ViewChild("addVehicleModel") module!: NgForm;
  @ViewChild(DatatableFullComponent) tableFull: any;

  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;

  public loading: boolean = false;
  public errors: any = [];
  singleFileUpload: File | null = null;
  multipleFileUpload: File | null = null;
  imageName = "Upload Image";
  separator = "";

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public reportOptions: any = [
    { id: "0", text: "CSV" },
    { id: "1", text: "EXCEL" },
    { id: "2", text: "PDF" },
  ];

  public brandNameOptions: any = [
    { id: "0", text: "Tata" },
    { id: "1", text: "Mahindra" },
    { id: "2", text: "Ashok Leyland" },
  ];
  public vehicleTypeOptions: any = [
    { id: "0", text: "Car" },
    { id: "1", text: "Bike" },
    { id: "2", text: "Auto" },
    { id: "3", text: "Bus" },
    { id: "4", text: "Mini Truck" },
    { id: "5", text: "Truck" },
    { id: "6", text: "Tractor Trailer" },
    { id: "7", text: "Machine" },
  ];
  public bharatStageOptions: any = [
    { id: "0", text: "BSIII" },
    { id: "1", text: "BSIV" },
    { id: "2", text: "BSVI" },
  ];
  public adblueOptions: any = [
    { id: "0", text: "No" },
    { id: "1", text: "Yes" },
  ];
  public useCaseOptions: any = [
    { id: "0", text: "Own Fleet" },
    { id: "1", text: "Hired Fleet" },
    { id: "1", text: "Both" },
  ];
  public statusOptions: any = [
    { id: "0", text: "Active" },
    { id: "1", text: "Deactive" },
    { id: "3", text: "Approved" },
    { id: "4", text: "Unapproved" },
  ];

  public tableResumeColumns: any = [];
  public optionResumeData: any = {};
  public fields: any = {
    vehicleModelName: "",
    brandName: "",
    image: "",
    imageCount: 0,
    vehicleType: "",
    curbWeight: "",
    grossWeight: "",
    seatingCapacity: "",
    milageE: "",
    milageL: "",
    singleTyreAxle: null,
    pairTyreAxle: null,
    dualPairTyreAxle: null,
    spareTyre: null,
    tyres: null,
    battery: "",
    bharartStage: "",
    adblue: "",
    useCase: "",
  };

  constructor(
    public tabEnterService: TabEnterService,
    private loader: LoadingService,
    public basicTaskService: BasicTasksService,
    private http: HttpService,
    private notification: NotificationService,
    public confirmService: ConfirmService,
    public eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.loading = true;
    this.loader.show();
    var self = this;

    this.tableColumns = [
      {
        title: "Sr. No.",
        data: "sr_no",
        width: "50px",
      },
      {
        title: "Name",
        data: "name",
        card: 1,
        width: "60px",
      },
      {
        title: "Brand",
        data: "brand_id",
        card: 1,
        width: "80px",
      },
      {
        title: "Type",
        data: "type",
        card: 1,
        width: "80px",
      },
      {
        title: "Curb Weight",
        data: "curb_weight",
        width: "90px",
      },
      {
        title: "Gross Weight",
        data: "gross_weight",
        width: "90px",
      },
      {
        title: "Seating Capacity",
        data: "seating_capacity",
        width: "120px",
      },
      {
        title: "Milage E",
        data: "milage_e",
        width: "70px",
      },
      {
        title: "Milage L",
        data: "milage_l",
        width: "70px",
      },
      {
        title: "Axle",
        data: "axle",
        width: "50px",
      },
      {
        title: "Tyre",
        data: "tyre",
        width: "50px",
      },
      {
        title: "Battery",
        data: "battery",
        width: "50px",
      },
      {
        title: "Bs",
        data: "bs",
        width: "50px",
      },
      {
        title: "Adblue",
        data: "adblue",
        width: "60px",
      },
      {
        title: "Status",
        data: "status",
        width: "50px",
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
        cardHead: true,
        card: false,
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
          sr_no: "1",
          name: "3518TC",
          brand_id: "Tata",
          type: "Tractor Trailer",
          curb_weight: "6500 Kg",
          gross_weight: "35000 Kg",
          seating_capacity: "3",
          milage_e: "4",
          milage_l: "3.6",
          axle: "2",
          tyre: "7",
          battery: "2",
          bs: "BSVI",
          adblue: "Yes",
          use_case: "Both",
          status: "Active",
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
    this.basicTaskService.highlightRequiredFields();
  }

  addEntry() {
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$("#addVehicleModel")).modal("toggle");
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
      // $('#viewJobPost .modal-body').html("<code>"+JSON.stringify(data)+"</code>");
      (<any>$("#viewPageDetails")).modal("toggle");
    } else if (data.length == 0) {
      alert("Please select any entry to View Details.");
    } else {
      alert("Only one entry can be View at a time.");
    }
  }

  setValue(fieldName: any, value: any) {
    this.fields[fieldName] = value;
  }

  calculateTyres() {
    this.fields.tyres =
      this.fields.singleTyreAxle * 2 +
      this.fields.pairTyreAxle * 4 +
      this.fields.dualPairTyreAxle * 8 +
      this.fields.spareTyre * 1;
  }

  submitLeadsInformation(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.loader.show();
      let body: any = {
        id: this.fields.id,
        name: this.fields.name,
        brand_id: this.fields.brandName,
        type: this.fields.type,
        curb_weight: this.fields.curbWeight,
        gross_weight: this.fields.grossWeight,
        seating_capacity: this.fields.seating_capacity,
        milage_e: this.fields.milageE,
        milage_l: this.fields.milageL,
        axle_1_tyre: this.fields.axle1Tyre,
        axle_2_tyre: this.fields.axle2Tyre,
        axle_4_tyre: this.fields.axle4Tyre,
        tyre: this.fields.tyre,
        battery: this.fields.battery,
        bs: this.fields.bs,
        adblue: this.fields.adblue,
        use_case: this.fields.useCase,
        status: this.fields.status,
      };

      let action: string = "add";

      if (this.fields.id && this.fields.id != 0) {
        action = "update";
      }
      this.http
        .postRequestWithHeaders("access-control/module/" + action, body)
        .subscribe(
          (response: any) => {
            if (response && response.status) {
              this.loading = false;
              this.loader.hide();
              this.notification.apiSuccess(response);
              (<any>$("#addModule")).modal("hide");
              form.resetForm();
              this.tableFull.reloadTable();
              this.eventService.emit("reloadSidebar");
            }
          },
          (error: any) => {
            this.loading = false;
            this.loader.hide();
            this.notification.apiError(error);
          }
        );
    } else {
      alert("Something went wrong, please try after sometime");
    }
  }

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }

  redirectToProfile(attr: string, value: string) {
    console.log(` attr : ${attr}, value : ${value}`);
    this.router.navigate(["profile", value, attr]);
    // $('.modal-backdrop').hide();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.separator = "<br />";
      this.mobile = false;
    } else {
      this.mobile = true;
      this.separator = "  ";
    }
  }
}
