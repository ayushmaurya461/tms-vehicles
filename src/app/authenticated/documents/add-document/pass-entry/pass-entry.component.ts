import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-pass-entry',
  templateUrl: './pass-entry.component.html',
  styleUrls: ['./pass-entry.component.css'],
})
export class PassEntryComponent implements OnInit {
  @ViewChild('passEntry') form!: NgForm;
  public selectedDocuments: any = [];
  public gstType = '';

  fields: any = {
    id: 0,
    location: 'Manesar',
    date: '',
    party: {
      name: '',
      billNo: '',
      billDate: '',
      creditDays: 0,
    },
    documents: [],
    account: {
      name: '',
      gstStatus: '',
      amount: '',
      gst: '',
      cgst: '',
      sgst: '',
      igst: '',
    },
    adjustmentRef: '',
    amount: '',
    cgst: '',
    sgst: '',
    totalAmount: 0,
    roundOff: 0,
    finalAmount: 0,
  };

  public partyOptions: any = [
    { id: 0, text: 'Demo Company', gst: 'igst' },
    { id: 1, text: 'Jain Trading Co.', gst: 'none' },
    { id: 2, text: 'Subhash Filling Station', gst: 'cgst' },
    { id: 3, text: 'Tata Motors Ltd.', gst: 'igst' },
  ];

  public itemNameOptions: any = [
    { id: 0, text: 'Document 12%' },
    { id: 1, text: 'Document 18%' },
    { id: 2, text: 'Amc Charges' },
  ];

  public unitOptions: any = [
    { id: 0, text: 'Pieces' },
    { id: 1, text: 'Number' },
  ];

  public gstOptions: any = [
    { id: 0, text: '0%' },
    { id: 5, text: '5%' },
    { id: 12, text: '12%' },
    { id: 18, text: '18%' },
    { id: 28, text: '28%' },
  ];

  adjustmentRefOptions: any = [
    { id: 0, text: '10000/200000' },
    { id: 1, text: '20000/0030300' },
  ];

  public gstStatusOptions: any = [
    { id: 0, text: 'Eligible' },
    { id: 1, text: 'Ineligible' },
  ];

  public accountNameOptions: any = [
    { id: 0, text: 'Manesar Tyre A/c' },
    { id: 1, text: 'Battery Expense' },
    { id: 2, text: 'Challan Expense' },
  ];
  constructor(
    public tabEnterService: TabEnterService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {}

  passEntry(data: any) {
    this.loader.show();
    this.fields = {
      id: 0,
      date: '',
      location: 'Manesar',
      party: {
        name: '',
        billNo: '',
        billDate: '',
        creditDays: 0,
      },
      documents: [],
      account: {
        name: '',
        gstStatus: '',
        amount: 0,
        gst: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
      },
      adjustmentRef: '',
      amount: 0,
      cgst: 0,
      sgst: 0,
      totalAmount: 0,
      roundOff: 0,
      finalAmount: 0,
    };
    if (data.length == 0) {
      alert('Please select atleast one document');
    } else {
      this.selectedDocuments = data.map((obj: any) => ({
        ...obj,
        amount: (Math.floor(Math.random() * (100 - 10 + 1)) + 10) * 100,
      }));

      (<any>$('#pass-entry')).modal('toggle');
    }
    for (let i = 0; i < this.selectedDocuments.length; i++) {
      this.fields.documents.push({
        name: this.selectedDocuments[i].name,
        id: this.selectedDocuments[i],
        item: [
          {
            itemName: '',
            hsn: '',
            quantity: '',
            unit: '',
            amount: 0,
            gst: '',
            cgst: 0,
            igst: 0,
            sgst: 0,
          },
        ],
      });
    }

    this.loader.hide();
  }

  setPartyDetails(value: any, fieldName: string) {
    this.fields.party[fieldName] = value;
  }

  checkItemsTotal(
    evnt: KeyboardEvent,
    documentIndex: number,
    itemIndex: number
  ) {
    let calcualtedAmount = 0;
    if ((evnt.key == 'Tab' || evnt.key == 'Enter') && !evnt.shiftKey) {
      if (!this.fields.documents[documentIndex].item[itemIndex].amount) {
        if (confirm("Amount Can't be zero")) {
          setTimeout(() => {
            $('#amount_' + documentIndex + '_' + itemIndex).trigger('focus');
          }, 50);
        } else {
          $('#amount_' + documentIndex + '_' + itemIndex).trigger('focus');
        }
      } else if (this.gstType != 'none') {
        return;
      } else {
        const amount = this.selectedDocuments[documentIndex].amount;
        this.fields.documents[documentIndex].item.forEach((i: any) => {
          calcualtedAmount += i.amount;
        });
        if (calcualtedAmount < amount) {
          if (
            this.fields.documents[documentIndex].item.length ==
            itemIndex + 1
          ) {
            if (this.checkHsn(documentIndex, itemIndex)) {
              if (this.checkQuantity(documentIndex, itemIndex)) {
                this.fields.documents[documentIndex].item.push({
                  itemName: '',
                  hsn: '',
                  quantity: 0,
                  unit: '',
                  amount: 0,
                  gst: '',
                  cgst: 0,
                  igst: 0,
                  sgst: 0,
                });
                setTimeout(() => {
                  $(
                    '#itemName_' +
                      documentIndex +
                      '_' +
                      (itemIndex + 1) +
                      ' .ngx-select'
                  ).trigger('focus');
                }, 10);
              } else {
                alert('Quantity Cannot be Blank');
              }
            } else {
              alert('HSN cannot be blank'); // checking HSN and Other Values
            }
          } else {
            $(
              '#itemName_' +
                documentIndex +
                '_' +
                (itemIndex + 1) +
                ' .ngx-select'
            ).trigger('focus');
          }
        } else if (calcualtedAmount == amount) {
          if (documentIndex + 1 < this.fields.documents.length) {
            setTimeout(() => {
              $(
                '#itemName_' + (documentIndex + 1) + '_' + 0 + ' .ngx-select'
              ).trigger('focus');
            }, 10);
          } else {
            $('#accountName .ngx-select').trigger('focus');
          }
        }
      }
    }
  }

  checkTotalAfterGst(documentIndex: number, itemIndex: number) {
    let documentAmount = 0;
    const amount = this.selectedDocuments[documentIndex].amount;

    this.fields.documents[documentIndex].item.forEach((i: any) => {
      documentAmount += i.amount;
    });
    if (this.checkHsn(documentIndex, itemIndex)) {
      if (this.checkQuantity(documentIndex, itemIndex)) {
        if (amount > documentAmount) {
          if (
            this.fields.documents[documentIndex].item.length ==
            itemIndex + 1
          ) {
            this.fields.documents[documentIndex].item.push({
              itemName: '',
              hsn: '',
              quantity: '',
              unit: '',
              amount: 0,
              gst: '',
              cgst: 0,
              igst: 0,
              sgst: 0,
            });
            setTimeout(() => {
              $(
                '#itemName_' +
                  documentIndex +
                  '_' +
                  (itemIndex + 1) +
                  ' .ngx-select'
              ).trigger('focus');
            }, 10);
          } else {
            $(
              '#itemName_' +
                documentIndex +
                '_' +
                (itemIndex + 1) +
                ' .ngx-select'
            ).trigger('focus');
          }
        } else if (documentAmount == amount) {
          if (documentIndex + 1 < this.fields.documents.length) {
            setTimeout(() => {
              $(
                '#itemName_' + (documentIndex + 1) + '_' + 0 + ' .ngx-select'
              ).trigger('focus');
            }, 10);
          } else {
            $('#accountName .ngx-select').trigger('focus');
          }
        }
      } else {
        alert('Quantity cannot be blank');
      }
    } else {
      alert('HSN cannot be blank');
    }
  }
  setPartyName(value: any) {
    this.form.reset();
    this.fields.party.name = value;
    const selectedPartyId = value[0];
    const selectedPartyObject = this.partyOptions.find(
      (obj: any) => obj.id === selectedPartyId
    );
    if (selectedPartyObject) {
      const gst = selectedPartyObject.gst;
      gst === 'igst'
        ? (this.gstType = 'igst')
        : gst === 'cgst'
        ? (this.gstType = 'cgst')
        : (this.gstType = 'none');

      if (gst == 'none') {
        setTimeout(() => {
          $('#itemName_0_0 .ngx-select').trigger('focus');
        }, 10);
      } else {
        setTimeout(() => {
          $('#billNo').trigger('focus');
        }, 10);
      }
    }
  }

  checkAmountsTotal() {
    let amount = 0;
    amount = this.fields.account.amount;
    this.fields.documents.forEach((d: any) => {
      d.item.forEach((i: any) => {
        amount += i.amount;
      });
    });
    this.fields.amount = amount;
    this.calculateTotalgst();
    this.calculateTotalAmount();
  }

  calculateTotalgst() {
    let gst = 0;
    if (this.gstType == 'igst') {
      this.fields.documents.forEach((doc: any) => {
        doc.item.forEach((i: any) => {
          gst += parseFloat(i.igst);
        });
      });
      gst = parseFloat(gst + this.fields.account.igst);
      this.fields.igst = gst;
    }
    if (this.gstType == 'cgst') {
      this.fields.documents.forEach((doc: any) => {
        doc.item.forEach((i: any) => {
          gst += parseFloat(i.cgst);
        });
      });
      gst = parseFloat(gst + this.fields.account.cgst);
      this.fields.cgst = this.fields.sgst = gst;
    }
  }

  setDocumentValues(
    value: any,
    DocumentIndex: number,
    itemIndex: number,
    field: string
  ) {
    this.fields.documents[DocumentIndex].item[itemIndex][field] = value;
  }

  setDocumentGst(evnt: any, documentIndex: number, itemIndex: number) {
    const selectedgst = evnt[0];
    this.fields.documents[documentIndex].item[itemIndex].gst = evnt;
    if (this.gstType == 'igst') {
      this.fields.documents[documentIndex].item[itemIndex].igst =
        (this.fields.documents[documentIndex].item[itemIndex].amount *
          selectedgst) /
        100;
    } else if (this.gstType == 'cgst') {
      this.fields.documents[documentIndex].item[itemIndex].sgst =
        (this.fields.documents[documentIndex].item[itemIndex].amount *
          selectedgst) /
        100;
      this.fields.documents[documentIndex].item[itemIndex].cgst =
        (this.fields.documents[documentIndex].item[itemIndex].amount *
          selectedgst) /
        100;
    }
    this.checkTotalAfterGst(documentIndex, itemIndex);
    this.calculateTotalgst();
  }
  setAdjustmentRef(value: any) {
    this.fields.adjustmentRef = value;
  }
  setAccountValues(value: any, fieldName: string) {
    this.fields.account[fieldName] = value;
  }
  setAccountGst(value: any) {
    this.fields.account.gst = value;
    const selectedGst = value[0];
    if (this.gstType == 'igst') {
      const igst = (this.fields.account.amount * selectedGst) / 100;
      this.fields.account.igst = igst;
    }
    if (this.gstType == 'cgst') {
      const cgstAndSgst = (this.fields.account.amount * selectedGst) / 100;
      this.fields.account.cgst = this.fields.account.sgst = cgstAndSgst;
    }
    this.calculateTotalgst();
  }

  checkHsn(documentIndex: number, itemIndex: number) {
    if (this.fields.documents[documentIndex].item[itemIndex].hsn) {
      return true;
    }
    return false;
  }

  checkQuantity(documentIndex: number, itemIndex: number) {
    if (this.fields.documents[documentIndex].item[itemIndex].quantity) {
      return true;
    }
    return false;
  }

  calculateTotalAmount() {
    if (this.gstType == 'none') {
      this.fields.totalAmount = parseFloat(this.fields.amount);
    } else if (this.gstType == 'igst') {
      this.fields.totalAmount = parseFloat(
        this.fields.amount + this.fields.igst
      );
    } else if (this.gstType == 'cgst') {
      this.fields.totalAmount = parseFloat(
        this.fields.amount + this.fields.cgst + this.fields.sgst
      );
    }
    this.roundOffFinalAmount();
  }

  submitPassEntry(form: any) {
    console.log(form);
  }

  roundOffFinalAmount() {
    const roundedValue = Math.round(this.fields.totalAmount);
    const totalAmount = parseFloat(this.fields.totalAmount);
    this.fields.roundOff = roundedValue - totalAmount;
    this.fields.finalAmount = Math.round(this.fields.totalAmount);
  }
}
