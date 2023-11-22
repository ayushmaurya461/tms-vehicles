import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";
import { DataCardComponent } from "../../shared/data-card/data-card.component";
import { ConfirmService } from "src/app/services/confirm.service";
import { LoadingService } from "src/app/services/loading.service";
import { HttpService } from "src/app/services/http.service";
import { NotificationService } from "src/app/services/notification.service";
import { TabEnterService } from "src/app/services/tab-enter.service";

@Component({
  selector: "app-document-provision",
  templateUrl: "./document-provision.component.html",
  styleUrls: ["./document-provision.component.css"],
})
export class DocumentProvisionComponent implements OnInit {
  @ViewChild(DatatableFullComponent) tableFull: any;
  @ViewChild(DataCardComponent) cards: any;

  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }

  public mobile = false;
  public mediaScreenSize: number = 768;

  public selectedValues: any = [];

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public currentData: any;

  public fields: any = {
    id: "",
    allFirst: "",
    allsecond: "",
    month: "",
    year: "",
  };

  public allFirstOptions: any = [
    { id: 0, text: "NL01ab2361" },
    { id: 1, text: "NL01ab2361" },
    { id: 2, text: "NL01ab2361" },
    { id: 3, text: "NL01ab2361" },
    { id: 4, text: "NL01ab2361" },
  ];

  public allSecondOptions: any = [
    { id: 0, text: "ALL" },
    { id: 1, text: "AMC Exp" },
    { id: 2, text: "Insurance" },
    { id: 3, text: "natinol permit" },
    { id: 4, text: "Indian Permit" },
  ];
  public monthOptions: any = [
    { id: 0, text: "January" },
    { id: 1, text: "Febuary" },
    { id: 2, text: "March" },
    { id: 3, text: "April" },
    { id: 4, text: "May" },
  ];
  public yearOptions: any = [
    { id: 0, text: "2024" },
    { id: 1, text: "2023" },
    { id: 2, text: "2022" },
    { id: 3, text: "2021" },
    { id: 4, text: "2020" },
  ];

  constructor(
    public confirmService: ConfirmService,
    public loader: LoadingService,
    public http: HttpService,
    public notification: NotificationService,
    public tabEnterService: TabEnterService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();

    const self = this;

    this.tableColumns = [
      {
        title: '<input type="checkbox">',
        width: "20px",
        data: "chkbox",
      },
      {
        title: "Document",
        data: "document",
        width: "100px",
        card: 1,
      },
      {
        title: "Vehicle No.",
        data: "vehicleNo",
        width: "100px",
        card: 1,
      },
      {
        title: "Valid From",
        data: "validForm",
        width: "100px",
        card: 1,
      },
      {
        title: "Valid To",
        data: "validTo",
        width: "100px",
        card: 1,
      },
    ];

    this.tableButtons = [
      {
        text: '<i class="ti-search"></i>',
        className: "buttons-collection searchButton",
        attr: {
          title: "Search",
        },
        action: function () {
          self.searchEntry();
        },
      },
    ];

    this.optionData = {
      serverSide: false,
      url: "",
      showBasicDetailsPage: true,
      data: [
        {
          document: "abc",
          vehicleNo: "24678",
          validForm: "",
          validTo: "",
          chkbox: "",
        },
        {
          document: "abc",
          vehicleNo: "24678",
          chkbox: "",
          validForm: "",
          validTo: "",
        },
        {
          document: "abc",
          vehicleNo: "24678",
          validForm: "",
          validTo: "",
        },
      ],
    };
  }

  searchEntry() {
    // this.partyOutstanding.resetForm();
    (<any>$("#searchDocument")).modal("toggle");
  }

  setSearchValue(value: any, formfield: any) {
    this.fields[formfield] = value;
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  submitSearchingForm(value: any) {
    console.log("value----", value);
  }
}
