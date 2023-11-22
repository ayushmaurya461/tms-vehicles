import { Component, OnInit } from '@angular/core';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-add-vehicle-document',
  templateUrl: './add-document-master.component.html',
  styleUrls: ['./add-document-master.component.css'],
})
export class AddDocumentMasterComponent implements OnInit {
  public fields: any = {
    id: '',
    name: '',
    gstApplicable: '',
    docExpence: '',
    approxAmount: '',
    prepaidAccount: '',
    maxValidityDocument: '',
    documentParameter: [{ value: '' }],
    documentConditions: [
      {
        timePeriod: '',
        accounting: '',
        bookingNotification: '',
      },
    ],
  };

  public gstApplicableOption: any = [
    { id: 0, text: 'yes' },
    { id: 1, text: 'no' },
  ];
  public expenceOptions: any = [
    { id: 0, text: 'Demo Company' },
    { id: 1, text: 'Haryana CGST Input' },
    { id: 2, text: 'Haryana CGST Output' },
  ];
  public prepaidOptions: any = [
    { id: 0, text: 'Yes' },
    { id: 1, text: 'No' },
  ];
  public validityOptions: any = [
    { id: 0, text: '1 Month' },
    { id: 1, text: '2 Month' },
    { id: 2, text: '3 Month' },
    { id: 3, text: '4 Month' },
    { id: 4, text: '5 Month' },
    { id: 5, text: '6 Month' },
    { id: 6, text: '7 Month' },
    { id: 7, text: '8 Month' },
  ];
  public parameterOptions: any = [
    { id: 0, text: 'Resource Name' },
    { id: 1, text: 'Govt.Name' },
    { id: 2, text: 'Ref No.' },
  ];
  public conditionOptions: any = [
    { id: 0, text: 'If Document Expiring in Next' },
  ];
  public timePeriodOptions: any = [
    { id: 0, text: 'Weak' },
    { id: 1, text: '2 Weak' },
    { id: 2, text: 'Month' },
    { id: 3, text: 'Quarter' },
  ];
  public accountingOptions: any = [
    { id: 0, text: 'Action on Accounting' },
    { id: 1, text: 'Block' },
    { id: 2, text: 'Notify' },
  ];

  constructor(public tabEnterService: TabEnterService) {}
  ngOnInit(): void {}

  addEntry() {
    (<any>$('#document-master')).modal('toggle');
    setTimeout(() => {
      $('#name').trigger('focus');
    }, 500);
  }

  setValues(value: any, fieldName: string) {
    this.fields[fieldName] = value;
  }

  setDocumentParameter(value: any, index: number) {
    this.fields.documentParameter[index].value = value;
  }

  setConditionsParameter(value: any, index: number, field: string) {
    this.fields.documentConditions[index][field] = value;
  }
  setTimePeriodParameter(value: any, index: number) {
    this.fields.timePeriodConditions[index].value = value;
  }

  setAccountingParameter(value: any, index: number) {
    this.fields.accounting[index].value = value;
  }

  addNewVehicleDocumentParameter() {
    const length = this.fields.documentParameter.length;
    if (length >= 1) {
      if (this.fields.documentParameter[length - 1].value != '')
        this.fields.documentParameter.push({ value: '' });
    } else {
      this.fields.documentParameter.push({ value: '' });
    }
  }
  removeVehicleDocumentParameter() {
    this.fields.documentParameter.splice(-1);
  }

  addDocumentConditions() {
    if (this.fields.documentConditions)
      this.fields.documentConditions.push({
        timePeriod: '',
        accounting: '',
        bookingNotification: '',
      });
  }
  removeDocumentConditions() {
    this.fields.documentConditions.splice(-1);
  }

  submitVehicleDocument(value: any) {
    console.log('value---', value.value);
  }
}
