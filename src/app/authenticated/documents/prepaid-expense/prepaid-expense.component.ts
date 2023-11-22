import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";
import { DataCardComponent } from "../../shared/data-card/data-card.component";
import { ConfirmService } from "src/app/services/confirm.service";
import { LoadingService } from "src/app/services/loading.service";
import { HttpService } from "src/app/services/http.service";
import { NotificationService } from "src/app/services/notification.service";
import { TabEnterService } from "src/app/services/tab-enter.service";

@Component({
  selector: "app-prepaid-expense",
  templateUrl: "./prepaid-expense.component.html",
  styleUrls: ["./prepaid-expense.component.css"],
})
export class PrepaidExpenseComponent implements OnInit {
  @ViewChild(DatatableFullComponent) tableFull: any;
  @ViewChild(DataCardComponent) cards: any;

  public counterData: any = [];
  public mobile = false;
  public mediaScreenSize: number = 768;

  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};
  public currentData: any;

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
        title: "Month",
        data: "month",
        width: "100px",
        card: 1,
      },
      {
        title: "Year",
        data: "year",
        width: "100px",
        card: 1,
      },
      {
        title: "Amount",
        data: "amount",
        width: "100px",
        card: 1,
      },
      {
        title: "Tran Date",
        data: "tranDate",
        width: "100px",
        card: 1,
      },
      {
        title: "TranId",
        data: "tranId",
        width: "100px",
        card: 1,
      },
    ];

    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection addButton",
        title: "Add",
        attr: {
          title: "Add Details",
        },
        action: function () {
          self.addEntry();
        },
        card: false,
        cardHead: true,
        class: "card-head-btns font-weight-bold",
      },
      {
        text: '<i class="ti-pencil"></i>',
        className: "buttons-collection editButton",
        title: "Edit",
        attr: {
          title: "Edit City",
        },
        card: true,
        class: "btn btn-success card-btns",
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
          console.log(rows);
          self.editEntry(rows);
        },
        cardAction: function () {
          self.editEntry(self.currentData);
        },
        cardHead: false,
      },
      {
        text: '<i class="ti-trash"></i>',
        className: "buttons-collection deleteButton",
        title: "Delete",
        card: true,
        class: "btn btn-danger card-btns",
        cardHead: false,
        attr: {
          title: "Delete City",
        },
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
          self.deleteEntry(rows);
        },
        cardAction: function () {
          self.deleteEntry(self.currentData);
        },
      },
      {
        text: '<i class="ti-filter">',
        title: "Visibility",
        attr: {
          title: "Column Visibility",
          id: "exportBtn",
        },
        extend: "colvis",
        card: false,
        cardHead: false,
      },
      {
        text: '<i class="ti-share">',
        attr: {
          title: "Export",
          id: "exportBtn",
        },
        cardHead: true,
        extend: "collection",
        title: "Export",
        card: false,
        class: "card-head-btns btn-primary",
        buttons: [
          {
            extend: "copy",
            text: '<i class="ti-files"> </i> Copy',
            columns: ".hideInitial",
            attr: {
              title: "Copy",
            },
            exportOptions: {
              columns: ":visible",
              rows: ":visible",
            },
            class: "card-head-dropdown-btns",
          },
          {
            extend: "print",
            text: '<i class="ti-printer"> </i> Print',
            columns: ".hideInitial",
            attr: {
              title: "Print",
            },
            exportOptions: {
              columns: ":visible",
              rows: ":visible",
            },
            class: "card-head-dropdown-btns",
          },
          {
            extend: "excelHtml5",
            text: '<i class="ti-file"> </i> Excel',
            columns: ".hideInitial",
            attr: {
              title: "Excel",
            },
            exportOptions: {
              columns: ":visible",
              rows: ":visible",
            },
            class: "card-head-dropdown-btns",
            title: "Demo Table.",
            customize: function (xlsx: any) {
              var sheet = xlsx.xl.worksheets["sheet1.xml"];
              var excelMap: any = {
                0: "A",
                1: "B",
                2: "C",
                3: "D",
                4: "E",
                5: "F",
                6: "G",
                7: "H",
                8: "I",
                9: "J",
                10: "K",
                11: "L",
                12: "M",
                13: "N",
                14: "O",
                15: "P",
                16: "Q",
                17: "R",
                18: "S",
                19: "T",
                20: "U",
                21: "V",
                22: "W",
                23: "X",
                24: "Y",
                25: "Z",
              };
              var rowCount = 0;
              $("row", sheet).each(function () {
                var row: any = this;
                var cellCount = $(row).children().length;
                for (let td = 0; td < cellCount; td++) {
                  if (rowCount === 1) {
                    $('c[r^="' + excelMap[td] + '"]', row).attr("s", "49");
                  }
                }
                rowCount++;
              });
            },
          },
          {
            extend: "csv",
            text: '<i class="ti-file"> </i> CSV',
            columns: ".hideInitial",
            attr: {
              title: "CSV",
            },
            exportOptions: {
              columns: ":visible",
              rows: ":visible",
            },
            class: "card-head-dropdown-btns",
          },
          {
            extend: "pdfHtml5",
            text: '<i class="ti-file"> </i> PDF',
            columns: ".hideInitial",
            pageSize: "LEGAL",
            exportOptions: {
              columns: ":visible",
              rows: ":visible",
            },
            class: "card-head-dropdown-btns",
            attr: {
              title: "PDF",
            },
            title: "Demo Table.",
            customize: function (doc: any) {
              doc.content[1].table.widths = Array(
                doc.content[1].table.body[0].length + 1
              )
                .join("*")
                .split("");
              doc.pageMargins = [10, 10, 10, 10];
              doc.defaultStyle.fontSize = 7;
              doc.styles.tableHeader.fontSize = 7;
              doc.styles.title.fontSize = 9;
              // Remove spaces around page title
              doc.content[0].text = doc.content[0].text.trim();
              // Create a footer
              doc["footer"] = function (page: any, pages: any) {
                return {
                  columns: [
                    "This is your left footer column",
                    {
                      // This is the right column
                      alignment: "right",
                      text: [
                        "page ",
                        { text: page.toString() },
                        " of ",
                        { text: pages.toString() },
                      ],
                    },
                  ],
                  margin: [10, 0],
                };
              };
              // Styling the table: create style object
              var objLayout: any = {};
              // Horizontal line thickness
              objLayout["hLineWidth"] = function (i: any) {
                return 0.5;
              };
              // Vert:anykal line thickness
              objLayout["vLineWidth"] = function (i: any) {
                return 0.5;
              };
              // Horizontal line color
              objLayout["hLineColor"] = function (i: any) {
                return "#aaa";
              };
              // Vertical line color
              objLayout["vLineColor"] = function (i: any) {
                return "#aaa";
              };
              // Left padding of the cell
              objLayout["paddingLeft"] = function (i: any) {
                return 4;
              };
              // Right padding of the cell
              objLayout["paddingRight"] = function (i: any) {
                return 4;
              };
              // Inject the object in the document
              doc.content[1].layout = objLayout;
            },
          },
        ],
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
          month: "may",
          year: "11",
          amount: "111",
          tranDate: "11",
          tranId: "1000",
        },
        {
          document: "abc",
          vehicleNo: "24678",
          month: "may",
          year: "11",
          amount: "111",
          tranDate: "11",
          tranId: "1000",
        },
        {
          document: "abc",
          vehicleNo: "24678",
          month: "may",
          year: "11",
          amount: "111",
          tranDate: "11",
          tranId: "1000",
        },
        {
          document: "abc",
          vehicleNo: "24678",
          month: "may",
          year: "11",
          amount: "111",
          tranDate: "11",
          tranId: "1000",
        },
      ],
    };
    this.counterData = [
      {
        id: 1,
        title: "All",
        data: "1883",
        icon: "ti-layout-grid2",
        colorClass: "bg-info",
      },
      {
        id: 2,
        title: "Pending",
        data: "1879",
        icon: "ti-light-bulb",
        colorClass: "bg-success",
      },
      {
        id: 3,
        title: "Passed",
        data: "4",
        icon: "ti-face-sad",
        colorClass: "bg-warning",
      },
    ];
  }

  addEntry() {
    (<any>$("#consignerDetails")).modal("toggle");
    setTimeout(() => {
      $("#name").trigger("focus");
    }, 500);
  }

  editEntry(data: any) {
    if (data.length == 1) {
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
          .postRequestWithHeaders("city/delete", { id: data[0]?.id })
          .subscribe(
            (response: any) => {
              if (this.mobile) {
                if (response && response.status) {
                  this.tableFull.reloadTable();
                  this.loader.hide();
                  this.notification.apiSuccess(response);
                } else {
                  this.notification.error(
                    "Something went wrong, please try after sometime"
                  );
                }
              } else {
                if (response && response.status) {
                  this.loader.hide();
                  this.ngOnInit();
                  this.cards.ngOnInit();
                  this.notification.apiSuccess(response);
                }
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
  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }
  counterClickFunction(data: any) {
    console.log(data);
    let functionData = {
      url: "company-creation/company-list",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }
}
