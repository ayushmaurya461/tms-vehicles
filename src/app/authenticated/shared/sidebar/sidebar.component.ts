import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/libraray/user.service';
import { EventService } from 'src/app/services/event.service';
import { SidebarService } from './sidebar.service';
import { animations } from '../animations/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: animations,
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @Input() smallerScreen = false;

  public loading: boolean = false;

  constructor(
    public eventService: EventService,
    public userService: UserService,
    public sidebarService: SidebarService
  ) {}

  public menus: any = [];
  // public menus: any = [
  //   {
  //     name: 'Dashboard',
  //     url: 'dashboard',
  //     icon: 'ti-dashboard',
  //     sub_modules: [],
  //   },
  //   {
  //     name: 'Company',
  //     url: '',
  //     icon: 'ti-world',
  //     sub_modules: [
  //       {
  //         name: 'Company Creation',
  //         url: 'company/company-creation',
  //       },
  //       {
  //         name: 'Companies List',
  //         url: 'company/companies-list',
  //       },
  //       {
  //         name: 'Duties & Taxes',
  //         url: 'company/duties-and-taxes',
  //       },
  //       {
  //         name: 'Modules',
  //         url: 'company/modules-list',
  //       },
  //       {
  //         name: 'Sub Modules',
  //         url: 'company/sub-modules-list',
  //       },
  //       {
  //         name: 'Tracking Configuration',
  //         url: 'company/tracking-configuration',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Geographical Details',
  //     url: '',
  //     icon: 'ti-signal',
  //     sub_modules: [
  //       {
  //         name: 'Countries',
  //         url: 'geographical/countries',
  //       },
  //       {
  //         name: 'States',
  //         url: 'geographical/states',
  //       },
  //       {
  //         name: 'Districts',
  //         url: 'geographical/districts',
  //       },
  //       {
  //         name: 'Sub Districts',
  //         url: 'geographical/sub-districts',
  //       },
  //       {
  //         name: 'Cities',
  //         url: 'geographical/cities',
  //       },
  //       {
  //         name: 'Locations',
  //         url: 'geographical/locations',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Demo Pages',
  //     url: '',
  //     icon: 'ti-info-alt',
  //     sub_modules: [
  //       {
  //         name: 'Form Elements',
  //         url: 'form-elements',
  //       },
  //       {
  //         name: 'Demo Datatable',
  //         url: 'table-demo',
  //       },
  //       {
  //         name: 'Multi Step Form',
  //         url: 'multistep-form',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Tracking',
  //     url: '',
  //     icon: 'ti-map-alt',
  //     sub_modules: [
  //       {
  //         name: 'Consignment Tracking',
  //         url: 'tracking/consignment-tracking',
  //       },
  //       {
  //         name: 'Employee Tracking',
  //         url: 'tracking/employee-tracking',
  //       },
  //       {
  //         name: 'Vehicle Tracking',
  //         url: 'tracking/vehicle-tracking',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Accounting',
  //     url: '',
  //     icon: 'ti-pencil-alt',
  //     sub_modules: [
  //       { name: 'Voucher', url: 'vouchers' },
  //       {
  //         name: 'Bank Reconsilation',
  //         url: 'accounting/bank-reconsilation',
  //       },
  //       {
  //         name: 'Balance Sheet',
  //         url: 'accounting/balance-sheet',
  //       },
  //       {
  //         name: 'Cost Centers',
  //         url: 'accounting/cost-centers',
  //       },
  //       {
  //         name: 'Cost Center Enquiry',
  //         url: 'accounting/cost-center-enquiry',
  //       },
  //       {
  //         name: 'Day Book',
  //         url: 'accounting/day-book',
  //       },
  //       {
  //         name: 'Groups',
  //         url: 'accounting/groups',
  //       },
  //       {
  //         name: 'Ledgers',
  //         url: 'accounting/ledgers',
  //       },
  //       {
  //         name: 'Ledger Enquiry',
  //         url: 'accounting/ledger-enquiry',
  //       },
  //       {
  //         name: 'Ledger Freeze Report',
  //         url: 'accounting/ledger-freeze-report',
  //       },
  //       {
  //         name: 'Outstanding',
  //         url: 'accounting/outstanding',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Branches',
  //     url: '',
  //     icon: 'ti-vector',
  //     sub_modules: [
  //       {
  //         name: 'Branch Details',
  //         url: 'branches/branch-details',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'System Configure',
  //     url: '',
  //     icon: 'ti-star',
  //     sub_modules: [
  //       {
  //         name: 'Category Fields',
  //         url: 'system-configure/category-fields',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Users',
  //     url: '',
  //     icon: 'ti-face-smile',
  //     sub_modules: [
  //       {
  //         name: 'Roles List',
  //         url: 'users/roles-list',
  //       },
  //       {
  //         name: 'Users List',
  //         url: 'users/users-list',
  //       },
  //     ],
  //   },
  // ];

  ngOnInit(): void {
    this.sidebarService.fetchMenu();
  }

  ngAfterViewInit() {}
}
