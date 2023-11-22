import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { PassEntryComponent } from "./pass-entry/pass-entry.component";
import { AddNewDocumentComponent } from "./add-new-document/add-new-document.component";

@Component({
  selector: "app-add-document",
  templateUrl: "./add-document.component.html",
  styleUrls: ["./add-document.component.css"],
})
export class AddDocumentComponent implements OnInit {
  @ViewChild(AddNewDocumentComponent) document: any;
  @ViewChild(PassEntryComponent) pass: any;
  @HostListener("window: resize", ["$event"])
  onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile = false;
  public mediaScreenSize: number = 768;
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};

  public currentData: any;

  public selectedRows: any = [];

  constructor() {}

  ngOnInit(): void {
    const self = this;
    this.checkScreenSize();

    this.tableColumns = [
      {
        title: "S.No",
        data: "sno.",
        width: "40px",
        card: 1,
      },
      {
        title: "Document Name",
        data: "name",
        width: "120px",
        card: 1,
      },
      {
        title: "Vehicle No.",
        data: "vehicleNo",
        width: "100px",
        card: 1,
      },
      {
        title: "Resource",
        data: "resource",
        width: "100px",
        card: 1,
      },
      {
        title: "Ref No.",
        data: "refNo",
        width: "100px",
        card: 1,
      },
      {
        title: "Valid From",
        data: "validFrom",
        width: "100px",
        card: 1,
      },
      {
        title: "Valid To",
        data: "validTo",
        width: "100px",
        card: 1,
      },
      {
        title: "Valid To",
        data: "validTo",
        width: "100px",
        card: 1,
      },
      {
        title: "InsuranceCompany",
        data: "insuranceCompany",
        width: "100px",
        card: 1,
      },
      {
        title: "Authority",
        data: "authority",
        width: "100px",
      },
      {
        title: "NCB",
        data: "ncb",
        width: "60px",
      },
      {
        title: "IDV",
        data: "idv",
        width: "60px",
      },
      {
        title: "Govt. Name",
        data: "govt",
        width: "100px",
      },
      {
        title: "Tax Name",
        data: "tax",
        width: "60px",
      },
      {
        title: "Amount",
        data: "amt",
        width: "60px",
      },
      {
        title: "Transaction ID",
        data: "transactionId",
        width: "100px",
      },
    ];

    this.tableButtons = [
      {
        text: '<i class="ti-plus"></i>',
        className: "buttons-collection addButton",
        title: "Add",
        attr: {
          title: "Add New Document",
        },
        action: function () {
          self.addEntry();
        },
        card: false,
        cardHead: true,
        class: "card-head-btns font-weight-bold",
      },
      {
        text: '<i class="ti-check"></i>',
        className: "buttons-collection passButton",
        title: "Pass Entry",
        attr: {
          title: "Pass Entry",
        },
        class: "btn btn-warning card-btns",
        card: true,
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((el: any) => {
              rows.push(el);
            });
          self.passEntry(rows);
        },
        cardAction: function () {
          self.passEntry([self.currentData]);
        },
      },
      {
        text: '<i class="ti-pencil"></i>',
        className: "buttons-collection editButton",
        title: "Edit",
        attr: {
          title: "Edit Document",
        },
        card: true,
        class: "btn btn-success card-btns",
        action: function () {
          var rows: any = [];
          this.rows({ selected: true })
            .data()
            .each((element: any) => rows.push(element));
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
          title: "Delete Document",
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
        text: '<i class="ti-check-box"></i>',
        className: "buttons-collection checkbox",
        title: "Check",
        attr: {
          title: "Select/Deselect All",
        },
        action: function () {
          var rows: any = [];
          self.checkUncheckAll(this.rows);
        },
      },
    ];

    this.optionData = {
      serverSide: false,
      url: "",
      showBasicDetailsPage: true,
      data: [
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
        {
          sno: 1,
          name: "INS",
          vehicleNo: "NL01AB32",
          resource: "Vendor1",
          refNo: "",
          validFrom: "12/02/2002",
          validTo: "12/09/2021",
          insuranceCompany: "",
          authority: "India",
          ncb: "",
          idv: "",
          govt: "Govt of Haryana",
          tax: "",
          amt: "100.00",
          transactionId: "",
        },
      ],
    };
  }

  addEntry() {
    this.document.addEntry();
  }

  editEntry(data: any) {
    this.document.editEntry(data);
  }

  deleteEntry(data: any) {}

  passEntry(rows: any) {
    this.pass.passEntry(rows);
    setTimeout(() => {
      $("#pass-date").trigger("focus");
      $("#pass-date").trigger("select");
    }, 500);
  }

  checkUncheckAll(rows: any) {
    this.selectedRows = !this.selectedRows;
    this.selectedRows ? rows().select() : rows().deselect();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }
}
