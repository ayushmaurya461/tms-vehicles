import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'add-new-document',
  templateUrl: './add-new-document.component.html',
  styles: [
    `
      .row {
        width: 100%;
      }

      .button {
        width: fit-content;
        margin: 2px;
      }
    `,
  ],
})
export class AddNewDocumentComponent implements OnInit {
  @ViewChild('document') form!: NgForm;

  fieldsToShow = {
    vehicleNo: '',
    resource: '',
    refNo: '',
    validFrom: '',
    validTo: '',
    insuranceCompany: '',
    authority: '',
    ncb: '',
    idv: '',
    govt: '',
    tax: '',
    amount: 0,
    transactionId: '',
  };

  public fields: any = {
    documentName: '',
    vehicleNo: '',
    resource: '',
    refNo: '',
    validFrom: '',
    validTo: '',
    insuranceCompany: '',
    authority: '',
    ncb: '',
    idv: '',
    govt: '',
    tax: '',
    amount: 0,
    transactionId: '',
  };

  public documentNameoptions: any = [];

  public vehcileOptions: any = [
    { id: 0, text: 'NLHS645362' },
    { id: 1, text: 'NSL862764573' },
  ];

  public resourceOptions: any = [
    { id: 1, text: 'Vendor 1' },
    { id: 2, text: 'Text customer' },
    { id: 3, text: 'Vendor 2' },
  ];

  refOptions: any = [
    { id: 1, text: 'e53271231' },
    { id: 2, text: 'r72432jfwwe' },
  ];

  insuranceCompanyOptions: any = [
    { id: 0, text: 'Reliance' },
    { id: 1, text: 'Bajaj' },
    { id: 3, text: 'HDFC' },
  ];

  authorityOptions: any = [
    { id: 0, text: 'ABCGD' },
    { id: 1, text: 'UGDSD' },
    { id: 2, text: 'TMKCP' },
  ];

  ncbOptions: any = [
    { id: 0, text: 'Y^RYWCD' },
    { id: 1, text: 'UDFWDCH' },
    { id: 3, text: 'dhfwdrwdgc' },
  ];

  idvOptions: any = [
    { id: 1, text: 'eufwi' },
    { id: 2, text: 'DKUEKWD' },
  ];

  govtOptions: any = [
    { id: 1, text: 'Govt Of Rajasthan' },
    { id: 2, text: 'Govt Of Haryana' },
  ];

  taxOptions: any = [
    { id: 1, text: 'ABC tax' },
    { id: 2, text: 'Lol Tax' },
  ];

  public documentNamesData = [
    {
      id: 1,
      sno: 1,
      name: 'INS',
      vehicleNo: 'NL01AB32',
      resource: 'Vendor1',
      refNo: '',
      validFrom: '',
      validTo: '',
      insuranceCompany: '',
      authority: 'India',
      ncb: '',
      idv: '',
      govt: 'Govt of Haryana',
      tax: '',
      amount: 100.0,
      transactionId: '',
    },
    {
      id: 2,
      sno: 2,
      name: 'RC',
      vehicleNo: 'NL01AB32',
      resource: '',
      refNo: '',
      validFrom: '',
      validTo: '',
      insuranceCompany: '',
      authority: 'India',
      ncb: '',
      idv: '',
      govt: 'Govt of Haryana',
      tax: '',
      amount: 100.0,
      transactionId: '',
    },
    {
      id: 3,
      sno: 2,
      name: 'RC',
      vehicleNo: 'NL01AB32',
      resource: '',
      refNo: '',
      validFrom: '',
      validTo: 'werew',
      insuranceCompany: '',
      authority: 'India',
      ncb: 'fewdw',
      idv: '',
      govt: 'Govt of Haryana',
      tax: '',
      amount: 100.0,
      transactionId: '',
    },
  ];

  constructor(public tabEnterService: TabEnterService) {}

  ngOnInit(): void {
    this.documentNamesData.forEach((d: any) => {
      this.documentNameoptions.push({
        id: d.id,
        text: d.name,
      });
    });
  }

  addEntry() {
    this.form.reset();
    (<any>$('#document')).modal('toggle');
  }

  editEntry(data: any) {
    (<any>$('#document')).modal('toggle');
  }

  setDocumentName(value: any) {
    this.form.reset();
    this.fields.documentName = value;
    this.fieldsToShow = {
      vehicleNo: '',
      resource: '',
      refNo: '',
      validFrom: '',
      validTo: '',
      insuranceCompany: '',
      authority: '',
      ncb: '',
      idv: '',
      govt: '',
      tax: '',
      amount: 0,
      transactionId: '',
    };
    this.checkFieldsToShow(value[0]);
  }

  setDocumentValues(value: any, fieldName: string) {
    this.fields[fieldName] = value;
  }

  checkFieldsToShow(selectedValue: any) {
    const filteredObject = this.documentNamesData.filter(
      (doc) => doc.id == selectedValue
    );
    if (filteredObject) {
      this.fieldsToShow = filteredObject[0];
    }
  }

  submitDetails(form: any) {}
}
