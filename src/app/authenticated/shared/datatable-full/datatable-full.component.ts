import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

// class DataTablesResponse {
//   data: any[] | undefined;
//   draw: number | undefined;
//   recordsFiltered: number | undefined;
//   recordsTotal: number | undefined;
// }

@Component({
  selector: 'table-full',
  templateUrl: './datatable-full.component.html',
  styleUrls: ['./datatable-full.component.css'],
})
export class DatatableFullComponent implements OnInit {
  @Input() columns: any = [];
  @Input() buttons: any = [];
  @Input() style = '';
  @Input() tableTitle = '';
  @Input() optionData: any = {};
  @Input() selection: boolean = true;
  @Output('dblClick') dblClick: any = new EventEmitter();

  public dtOptions: any = {};
  public dtRendered: boolean = true;

  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    public httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    var self: any = this;
    this.dtOptions = {
      bProcessing: true,
      bPaginate: this.optionData.pagination == false ? false : true,
      bDestroy: true,
      bAutoWidth: true,
      sScrollY: this.optionData.pagination == false ? false : '276',
      sScrollX: '100%',
      bFilter: true,
      serverSide: this.optionData.serverSide,
      processing: true,
      select: this.selection
        ? true
        : {
            style: 'multi',
            // selector: 'td:first-child',
          },
      bLengthChange: true,
      keys: {
        keys: [38 /* up */, 40 /* down */],
      },
      data: !this.optionData.serverSide ? this.optionData.data : [],
      ajax: this.optionData.serverSide
        ? (dataTablesParameters: any, callback: any) => {
            dataTablesParameters.conditions = this.optionData.conditions;

            this.httpService
              .postRequestWithHeaders(this.optionData.url, dataTablesParameters)
              .subscribe(
                (resp: any) => {
                  callback({
                    recordsTotal: resp.response.recordsTotal,
                    recordsFiltered: resp.response.recordsFiltered,
                    data: resp.response.data,
                  });
                },
                (err) => {
                  if (err.status == 404) {
                    $('.dataTables_processing #loader img').attr(
                      'src',
                      'assets/gif/404.gif'
                    );
                  }
                  if (err.status == 401) {
                    this.authService.logout();
                  } else {
                    $('.dataTables_processing #loader img').attr(
                      'src',
                      'assets/gif/500.gif'
                    );
                  }
                }
              );
          }
        : false,
      columns: this.columns,
      columnDefs: [
        {
          targets: '_all',
          createdCell: function (
            td: any,
            cellData: any,
            rowData: any,
            row: any,
            col: any
          ) {
            $(td).attr('title', cellData);
          },
        },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('dblclick');
        $('td', row).bind('dblclick', () => {
          this.dblClick.emit(data);
        });
        return row;
      },
      dom: '<"navbar"<"navbar-header"><"#tableHeader.navbar-collapse"<"table-header"f<"tableButtons"Bl>>>>rtip',
      lengthMenu: [
        [10, 25, 50, 100, 250, 500],
        ['10', '25', '50', '100', '250', '500'],
      ],
      language: {
        lengthMenu: '_MENU_',
        paginate: {
          next: '<i class="fa fa-chevron-right" ></i>',
          previous: '<i class="fa fa-chevron-left" ></i>',
        },
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
      },
      buttons: [
        ...this.buttons,
        {
          text: '<i class="ti-share">',
          attr: {
            title: 'Export',
            id: 'exportBtn',
          },
          extend: 'collection',
          buttons: [
            {
              extend: 'copy',
              text: '<i class="ti-files"> </i> Copy',
              columns: '.hideInitial',
              attr: {
                title: 'Copy',
              },
              exportOptions: {
                columns: ':visible',
                rows: ':visible',
              },
            },
            {
              extend: 'print',
              text: '<i class="ti-printer"> </i> Print',
              columns: '.hideInitial',
              attr: {
                title: 'Print',
              },
              exportOptions: {
                columns: ':visible',
                rows: ':visible',
              },
            },
            {
              extend: 'excelHtml5',
              text: '<i class="ti-file"> </i> Excel',
              columns: '.hideInitial',
              attr: {
                title: 'Excel',
              },
              exportOptions: {
                columns: ':visible',
                rows: ':visible',
              },
              title: 'Demo Table.',
              customize: function (xlsx: any) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                var excelMap: any = {
                  0: 'A',
                  1: 'B',
                  2: 'C',
                  3: 'D',
                  4: 'E',
                  5: 'F',
                  6: 'G',
                  7: 'H',
                  8: 'I',
                  9: 'J',
                  10: 'K',
                  11: 'L',
                  12: 'M',
                  13: 'N',
                  14: 'O',
                  15: 'P',
                  16: 'Q',
                  17: 'R',
                  18: 'S',
                  19: 'T',
                  20: 'U',
                  21: 'V',
                  22: 'W',
                  23: 'X',
                  24: 'Y',
                  25: 'Z',
                };
                var rowCount = 0;
                $('row', sheet).each(function () {
                  var row: any = this;
                  var cellCount = $(row).children().length;
                  for (let td = 0; td < cellCount; td++) {
                    if (rowCount === 1) {
                      $('c[r^="' + excelMap[td] + '"]', row).attr('s', '49');
                    }
                  }
                  rowCount++;
                });
              },
            },
            {
              extend: 'csv',
              text: '<i class="ti-file"> </i> CSV',
              columns: '.hideInitial',
              attr: {
                title: 'CSV',
              },
              exportOptions: {
                columns: ':visible',
                rows: ':visible',
              },
            },
            {
              extend: 'pdfHtml5',
              text: '<i class="ti-file"> </i> PDF',
              columns: '.hideInitial',
              pageSize: 'LEGAL',
              exportOptions: {
                columns: ':visible',
                rows: ':visible',
              },
              attr: {
                title: 'PDF',
              },
              title: 'Demo Table.',
              customize: function (doc: any) {
                doc.content[1].table.widths = Array(
                  doc.content[1].table.body[0].length + 1
                )
                  .join('*')
                  .split('');
                doc.pageMargins = [10, 10, 10, 10];
                doc.defaultStyle.fontSize = 7;
                doc.styles.tableHeader.fontSize = 7;
                doc.styles.title.fontSize = 9;
                // Remove spaces around page title
                doc.content[0].text = doc.content[0].text.trim();
                // Create a footer
                doc['footer'] = function (page: any, pages: any) {
                  return {
                    columns: [
                      'This is your left footer column',
                      {
                        // This is the right column
                        alignment: 'right',
                        text: [
                          'page ',
                          { text: page.toString() },
                          ' of ',
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
                objLayout['hLineWidth'] = function (i: any) {
                  return 0.5;
                };
                // Vert:anykal line thickness
                objLayout['vLineWidth'] = function (i: any) {
                  return 0.5;
                };
                // Horizontal line color
                objLayout['hLineColor'] = function (i: any) {
                  return '#aaa';
                };
                // Vertical line color
                objLayout['vLineColor'] = function (i: any) {
                  return '#aaa';
                };
                // Left padding of the cell
                objLayout['paddingLeft'] = function (i: any) {
                  return 4;
                };
                // Right padding of the cell
                objLayout['paddingRight'] = function (i: any) {
                  return 4;
                };
                // Inject the object in the document
                doc.content[1].layout = objLayout;
              },
            },
          ],
        },
      ],
      oLanguage: {
        sProcessing:
          "<div id='loader'><img src='assets/gif/loading-datatable.gif' /></div>",
        zeroRecords:
          "<div id='loader'><img src='assets/img/progress/norecordfound.gif' style='max-width:100%;max-height:260px;' /></div>",
      },
      preDrawCallback: function (settings: any) {
        $('div.dataTables_filter input').focus();
        $('.dataTables_processing, .dataTables_scroll').wrapAll(
          '<div class="tableWrapper">'
        );
        let tableHeight = $('.dataTables_scroll').height() ?? 0;
        $('.dataTables_processing').css({ height: '' + (tableHeight - 30) });
        $('.tableButtons').addClass('d-flex justify-content-end');
        $('#tableHeader').addClass('collapse');
        $('.navbar').addClass('navbar-inverse navbar-expand-lg');
        // $('.navbar-header').html(
        //   '<a type="button" class="navbar-toggle" data-toggle="collapse" data-target="#tableHeader"><span class="ti-menu"></span></a>'
        // );
      },
      drawCallback: function (settings: any) {},
      initComplete: function () {
        $(function () {
          $(this).keydown(function (e) {
            switch (e.keyCode) {
              //arrow down
              case 40:
                var thisRow = $('#datatable')
                  .DataTable()
                  .row({ selected: true })
                  .node();
                var nextRow = $(thisRow).next('tr');
                var nextRowIdx = $(nextRow).index();
                var rowCount = $('#datatable').DataTable().rows().count();

                if (!(nextRowIdx > rowCount) && !(nextRowIdx == -1)) {
                  if ($(nextRow).hasClass('group'))
                    nextRow = $(nextRow).next('tr');
                  // (<any>$("#datatable").DataTable().row(nextRowIdx-1)).scrollTo();
                  (<any>$('#datatable').DataTable().row(nextRow)).select();
                  (<any>$('#datatable').DataTable().row(thisRow)).deselect();
                }

                if (nextRowIdx == -1) {
                  (<any>$('#datatable').DataTable().rows()).deselect();
                  (<any>(
                    $('#datatable')
                      .DataTable()
                      .row(':eq(0)', { page: 'current' })
                  )).select();
                }

                e.preventDefault();
                break;

              //arrow up
              case 38:
                var thisRow = $('#datatable')
                  .DataTable()
                  .row({ selected: true })
                  .node();
                var prevRow = $(thisRow).prev('tr');
                var prevRowIdx = $(prevRow).index();
                var rowCount = $('#datatable').DataTable().rows().count();
                if (!(prevRowIdx < 0)) {
                  if ($(prevRow).hasClass('group'))
                    prevRow = $(prevRow).next('tr');
                  (<any>$('#datatable').DataTable().row(prevRow)).select();
                  (<any>$('#datatable').DataTable().row(thisRow)).deselect();
                }

                e.preventDefault();
                break;
            }
          });
          $('.dataTable').focus();
          $("select[name='datatable_length']").change(function () {
            $("select[name='datatable_length']").blur();
            $('.dataTable').focus();
          });
          if (self.optionData.pagination == false) {
            $('#datatable_filter').hide();
            $('#datatable_info').hide();
          }
        });

        (<any>$('button[title!=""]')).tooltip({
          trigger: 'hover',
        });

        var dtable = this.api();

        $('#datatable tbody').on('click', 'td.dt-control', function () {
          var tr = $(this).closest('tr');
          var row = dtable.row(tr);

          if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          } else {
            row.child(self.format(row.data())).show();
            tr.addClass('shown');
          }
        });
        dtable.columns().every(function (data: any) {
          let th = dtable.column(data).header();
          $(th).attr('title', $(th).text());
          (<any>$(th)).tooltip({
            trigger: 'hover',
          });
        });
        $('.dataTables_filter input')
          .unbind()
          .bind('keyup', function (e) {
            let value = '' + $('.dataTables_filter input').val();
            if (e.keyCode == 13) {
              dtable.search(value).draw();
            } else if (e.keyCode == 38 || e.keyCode == 40) {
              $('.dataTable').focus();
              $('div.dataTables_filter input').blur();
            }
            return;
          });
      },
    };
  }

  format(rowData: any) {
    var div = $('<div/>').addClass('loading').text('Loading...');

    // $.ajax( {
    //     url: '/api/staff/details',
    //     data: {
    //         name: rowData.name
    //     },
    //     dataType: 'json',
    //     success: function ( json ) {
    //         div.html( json.html ).removeClass( 'loading' );
    //     }
    // } );
    div.html('json.html').removeClass('loading');

    return div;
  }

  reloadTableWithNewDataUrl(data: any) {
    let url = data.url;
    this.dtRendered = false;

    this.dtOptions = {
      bProcessing: true,
      bDestroy: true,
      bAutoWidth: true,
      sScrollY: '276',
      sScrollX: '100%',
      bFilter: true,
      serverSide: this.optionData.serverSide,
      processing: true,
      select: true,
      bLengthChange: true,
      keys: {
        keys: [38 /* up */, 40 /* down */],
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        dataTablesParameters.conditions = data.conditions;
        this.httpService
          .postRequestWithHeaders(url, dataTablesParameters)
          .subscribe(
            (resp: any) => {
              callback({
                recordsTotal: resp.response.recordsTotal,
                recordsFiltered: resp.response.recordsFiltered,
                data: resp.response.data,
              });
            },
            (err) => {
              if (err.status == 404) {
                $('.dataTables_processing #loader img').attr(
                  'src',
                  'assets/gif/404.gif'
                );
              }
              if (err.status == 401) {
                this.authService.logout();
              } else {
                $('.dataTables_processing #loader img').attr(
                  'src',
                  'assets/gif/500.gif'
                );
              }
            }
          );
      },
      columns: this.columns,
      dom: '<"navbar"<"navbar-header"><"#tableHeader.navbar-collapse"<"table-header"f<"tableButtons"Bl>>>>rtip',
      lengthMenu: [
        [10, 25, 50, 100, 250, 500],
        ['10', '25', '50', '100', '250', '500'],
      ],
      language: {
        lengthMenu: '_MENU_',
        paginate: {
          next: '<i class="fa fa-chevron-right" ></i>',
          previous: '<i class="fa fa-chevron-left" ></i>',
        },
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
      },
      buttons: this.buttons,
      oLanguage: {
        sProcessing:
          "<div id='loader'><img src='assets/gif/loading-datatable.gif' /></div>",
        zeroRecords:
          "<div id='loader'><img src='assets/img/progress/norecordfound.gif' style='max-width:100%;max-height:260px;' /></div>",
      },
      preDrawCallback: function (settings: any) {
        $('div.dataTables_filter input').focus();
        $('.dataTables_processing, .dataTables_scroll').wrapAll(
          '<div class="tableWrapper">'
        );
        let tableHeight = $('.dataTables_scroll').height() ?? 0;
        $('.dataTables_processing').css({ height: '' + (tableHeight - 30) });
        $('.tableButtons').addClass('d-flex justify-content-end');
        $('#tableHeader').addClass('collapse');
        $('.navbar').addClass('navbar-inverse navbar-expand-lg');
        // $('.navbar-header').html(
        //   '<a type="button" class="navbar-toggle" data-toggle="collapse" data-target="#tableHeader"><span class="ti-menu"></span></a>'
        // );
      },
      initComplete: function () {
        var dtable = this.api();
        $('.dataTables_filter input')
          .unbind()
          .bind('keyup', function (e) {
            let value = '' + $('.dataTables_filter input').val();
            if (e.keyCode == 13 || value == '') {
              dtable.search(value).draw();
            }
            return;
          });
      },
    };

    this.ref.detectChanges();
    this.dtRendered = true;
    this.ref.detectChanges();
  }

  reloadTable() {
    this.dtRendered = false;
    this.ref.detectChanges();
    this.dtRendered = true;
    this.ref.detectChanges();
  }
}
