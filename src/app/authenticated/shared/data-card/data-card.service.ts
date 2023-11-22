import { EventEmitter, Injectable, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import * as EXCELjs from 'exceljs';
import autoTable from 'jspdf-autotable';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataCardService {
  listWithIndexes: any[] = [];
  dataRow: any[] = [];
  dataList: any[] = [];
  totalRecords = 0;
  loadRecords = 0;
  showDetails: boolean = false;
  currentDetails: any;
  details!: any;
  noRecordsFound = false;

  @Output() showFullDetailsPage: EventEmitter<any> = new EventEmitter<any>();
  listLoading: boolean = true;
  loadMore: boolean = true;

  constructor(
    private httpService: HttpService,
    private loader: LoadingService
  ) {}

  // fetchData(optionData: any, body: any, columns: any[]) {
  //   this.dataList = [];
  //   const res = {
  //     response: {
  //       data: [
  //         {
  //           sno: 1,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //         {
  //           sno: 2,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //         {
  //           sno: 3,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //         {
  //           sno: 4,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //         {
  //           sno: 5,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //         {
  //           sno: 6,
  //           partyName: 'ABC',
  //           creditPeriod: 24,
  //           type: 'DEF',
  //           branch: 'GHI',
  //           billAmount: 423423,
  //           paidAmount: 42343,
  //           onAccount: 432432,
  //           salesPerson: 'AKJS',
  //           balance: 4324324,
  //         },
  //       ],
  //     },
  //   };
  //   if (res.response.data == null || res.response.data.length == 0) {
  //     this.noRecordsFound = true;
  //   }
  //   const details = (this.listWithIndexes = res.response.data);
  //   this.loadRecords += res.response.data.length;

  //   if (this.loadRecords == this.totalRecords) this.loadMore = false;
  //   details.map((e: any) => {
  //     this.dataRow = [];
  //     columns.forEach((card: any) => {
  //       if (card.card == 1) {
  //         var arr = card.data.split('.');
  //         var value = '';
  //         for (var i = 0; i < arr.length; i++) {
  //           value = value == '' ? e[arr[i]] : value[arr[i]];
  //         }
  //         this.dataRow.push({
  //           title: card.title,
  //           value: value,
  //         });
  //       }
  //     });
  //     this.dataList.push(this.dataRow);
  //     this.loader.hide();
  //   });
  // }

  fetchData(optionData: any, body: any, columns: any[]) {
    this.dataList = [];
    this.httpService.getCompleteList(optionData.url, body).subscribe((res) => {
      if (res.response.data == null || res.response.data.length == 0) {
        this.noRecordsFound = true;
      }
      const details = (this.listWithIndexes = res.response.data);
      this.totalRecords = res.response.recordsTotal;
      this.loadRecords += res.response.data.length;

      if (this.loadRecords == this.totalRecords) this.loadMore = false;
      details.map((e: any) => {
        this.dataRow = [];
        columns.forEach((card: any) => {
          if (card.card == 1) {
            var arr = card.data.split('.');
            var value = '';
            for (var i = 0; i < arr.length; i++) {
              value = value == '' ? e[arr[i]] : value[arr[i]];
            }
            this.dataRow.push({
              title: card.title,
              value: value,
            });
          }
        });
        this.dataList.push(this.dataRow);
        this.loader.hide();
      });
    });
  }

  loadMoreData(optionData: any, body: any, columns: any) {
    this.httpService
      .getCompleteList(optionData.url, body)
      .pipe(take(1))
      .subscribe((res) => {
        const details = res.response.data;
        this.loadRecords += details.length;
        if (this.loadRecords == this.totalRecords) this.loadMore = false;
        if (details.length > 0) {
          details.map((e: any) => {
            this.listWithIndexes.push(e);
            this.dataRow = [];
            columns.forEach((card: any) => {
              if (card.card == 1) {
                var arr = card.data.split('.');
                var value = '';
                for (var i = 0; i < arr.length; i++) {
                  value = value == '' ? e[arr[i]] : value[arr[i]];
                }
                this.dataRow.push({
                  title: card.title,
                  value: value,
                });
              }
            });
            this.dataList.push(this.dataRow);
            this.listLoading = false;
          });
        } else {
          this.listLoading = false;
        }
      });
  }

  headerButtons(buttons: any[], columns: any[], optionData: any) {
    buttons.forEach((button) => {
      if (button.cardHead == true) {
        var $btn = $('<button/>');
        $btn.html(button.text);
        $btn.attr('class', button.class);
        $btn.attr('title', button.attr.title);
        if (button.title == 'Export') {
          var $div = $('<div class="dropdown-head-data-card"></div>');
          button.buttons.forEach((dropdownButton: any) => {
            var $appendedButton = $('<button/>');
            $appendedButton.html(dropdownButton.text);
            $appendedButton.attr('title', dropdownButton.attr.title);
            $appendedButton.attr('class', dropdownButton.class);
            $appendedButton.on('click', () =>
              this.exportData(
                dropdownButton.attr.title,
                this.listWithIndexes,
                columns,
                optionData
              )
            );
            $div.append($appendedButton);
            $btn.append($div);
          });
          $btn.on('click', function () {
            $div.toggle();
          });
        } else {
          $btn.on('click', button.action);
        }
        $('.btn-controls').append($btn);
      }
    });
  }

  exportData(
    title: any,
    listWithIndexes: any[],
    columns: any[],
    optionData: any
  ) {
    const list = [];
    var lstWithIndexes: any[] = [];
    listWithIndexes.forEach((e: any) => {
      var lst: any[] = [];
      var obj: Record<string, string> = {};
      columns.forEach((col) => {
        const arr: string[] = col.data.split('.');
        var val = '';
        for (var i = 0; i < arr.length; i++) {
          val = val == '' ? e[arr[i] as any] : val[arr[i] as any];
        }
        var key: string = col.title;
        obj[key] = val;
      });
      lstWithIndexes.push(obj);
    });

    if (title == 'Excel') {
      const workBook = new EXCELjs.Workbook();
      const workSheet = workBook.addWorksheet('Sheet1');

      var cols: any = [];
      columns.forEach((c) => {
        cols.push({
          header: c.title,
          key: c.title,
          width: 25,
        });
      });

      workSheet.columns = cols;
      workSheet.addRows(lstWithIndexes);
      const headerStyle: Partial<any> = {
        font: {
          color: { argb: '000000' },
          underline: 'single',
        },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '98A8D6' },
        },
      };
      workSheet.getRow(1).eachCell((cell) => {
        cell.style = headerStyle;
      });

      workBook.xlsx.writeBuffer().then((buffer) => {
        this.saveAsExcelFile(buffer, optionData.url + '.xlsx');
      });
    } else if (title == 'PDF') {
      // PDF
      var cols: any = [];
      columns.forEach((c) => {
        cols.push({ header: c.title, dataKey: c.title });
      });
      const doc = new jsPDF();
      const headStyle: Partial<any> = {
        fillColor: [45, 65, 84],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      };
      doc.text(optionData.url.split('-')[0].toUpperCase(), 85, 10);
      autoTable(doc, {
        head: [cols.map((col: any) => col.header)],
        body: lstWithIndexes.map((row) => cols.map((c: any) => row[c.dataKey])),
        headStyles: headStyle,
        columnStyles: {
          0: { cellWidth: 40 },
        },
        bodyStyles: {
          lineWidth: 0.01,
          lineColor: 'A6A7AA',
          fontSize: 8,
          textColor: 'black',
        },
        tableLineColor: 'A6A7AA',
        tableLineWidth: 0.1,
      });
      doc.save(optionData.url + '.pdf');
    } else if (title == 'CSV') {
      //CSV
      const workSheet = XLSX.utils.json_to_sheet(lstWithIndexes);
      const csv = XLSX.utils.sheet_to_csv(workSheet);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', optionData.url + '.csv');
      a.click();
    } else if (title == 'Print') {
      //PRINT
      var cols: any = [];
      columns.forEach((c) => {
        cols.push({ header: c.title, dataKey: c.title });
      });

      const doc = new jsPDF();
      const headStyle: Partial<any> = {
        fillColor: [45, 65, 84],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      };
      doc.text(optionData.url.split('-')[0].toUpperCase(), 85, 10);
      autoTable(doc, {
        head: [cols.map((col: any) => col.header)],
        body: lstWithIndexes.map((row) => cols.map((c: any) => row[c.dataKey])),
        headStyles: headStyle,
        columnStyles: {
          0: { cellWidth: 40 },
        },
        bodyStyles: {
          lineWidth: 0.01,
          lineColor: 'A6A7AA',
          fontSize: 8,
          textColor: 'black',
        },
        tableLineColor: 'A6A7AA',
        tableLineWidth: 0.1,
      });
      const pdfDataUri = doc.output('datauristring');
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`;
        newTab.addEventListener('load', () => {
          console.log('Load event fired on new tab');
          setTimeout(() => {
            newTab.window.print();
          }, 1000);
        });
      }
    } else if (title == 'Copy') {
      //COPY
      const workSheet = XLSX.utils.json_to_sheet(lstWithIndexes);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet1');
      const sheetData = XLSX.utils.sheet_to_csv(workSheet, { FS: '\t' });
      this.copyToClipboad(sheetData);
    }
  }

  copyToClipboad(sheetData: string) {
    const clipBoard = new DataTransfer();
    clipBoard.setData('text/plain', sheetData);
    navigator.clipboard.writeText(clipBoard.getData('text/plain'));
  }

  saveAsExcelFile(excelBuffer: any, fileName: string) {
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + '.xlsx'
    );
  }
}
