import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent implements OnInit {
  public currentURL: string = '';
  public params: { id: string; type: string } = {
    id: '',
    type: '',
  };

  public dataList: any = [];
  public activeSection: string = 'profile';
  public driverProfile = [
    {
      profile: {
        personelProfile: {
          name: 'Raj Kumar',
          father_name: 'Soychand',
          dob: '12-09-1999',
          employer: 'Bhatia Travels',
          permissions: 'Driver Level',
          doj: '12-09-2020',
          Designation: 'Driver',
        },
        driverDetails: [
          {
            name: 'trips',
            data: {
              id: 'trips',
              title: 'Trips',
              icon: '',
              iconImage: 'assets/img/icon/trip.png',
              data: [
                {
                  settlementNo: 'SN2122FTS3333',
                  from: 'Sanand Railway Station',
                  to: 'Pegasus Ahmadabad',
                  freight: '6,240.00',
                  expense: '2,929.12',
                  profit: parseFloat('2765.88'),
                },
                {
                  settlementNo: 'SN2122FTS3333',
                  from: 'Pegasus Ahmadabad',
                  to: 'Sanand Railway Station',
                  freight: '0.00',
                  expense: '929.12',
                  profit: parseFloat('-929.12'),
                },
                {
                  settlementNo: 'SN2122FTS3333',
                  from: 'Pegasus Ahmadabad',
                  to: 'Sanand Railway Station',
                  freight: '2929.12',
                  expense: '929.12',
                  profit: parseFloat('2000.00'),
                },
                {
                  settlementNo: 'SN2122FTS3333',
                  from: 'Pegasus Ahmadabad',
                  to: 'Sanand Railway Station',
                  freight: '21200.00',
                  expense: '12010.20',
                  profit: parseFloat('9190.80'),
                },
              ],
            },
          },
          {
            name: 'tyres',
            data: {
              id: 'tyres',
              title: 'Tyres',
              icon: '',
              iconImage: 'assets/img/icon/tyre.png',
              data: [
                {
                  vehicleNo: 'HR55R6334',
                  date: '22-02-2022',
                  tyreCompany: 'Apollo',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Pata ni ku utara tha abhi yad ni h',
                },
                {
                  vehicleNo: 'RJ55R6334',
                  date: '21-02-2022',
                  tyreCompany: 'MRF',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Apna kam kr na tujhe bdi panchayat krni h',
                },
                {
                  vehicleNo: 'HR55R6334',
                  date: '22-02-2022',
                  tyreCompany: 'Apollo',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Pata ni ku utara tha abhi yad ni h',
                },
                {
                  vehicleNo: 'RJ55R6334',
                  date: '21-02-2022',
                  tyreCompany: 'MRF',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Apna kam kr na tujhe bdi panchayat krni h',
                },
                {
                  vehicleNo: 'HR55R6334',
                  date: '22-02-2022',
                  tyreCompany: 'Apollo',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Pata ni ku utara tha abhi yad ni h',
                },
                {
                  vehicleNo: 'RJ55R6334',
                  date: '21-02-2022',
                  tyreCompany: 'MRF',
                  tyreRun: '232KM',
                  cpkm: '22',
                  reson: 'Apna kam kr na tujhe bdi panchayat krni h',
                },
              ],
            },
          },
          {
            name: 'maintainance',
            data: {
              id: 'maintainance',
              title: 'Maintainance',
              icon: '',
              iconImage: 'assets/img/icon/maintainance.png',
              data: [
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  jcNo: 'DSWE2324234',
                  date: '22-02-2022',
                  maintainanceType: 'Repair',
                  cost: '2200',
                  reson: 'Unknown',
                },
              ],
            },
          },
          {
            name: 'accidents',
            data: {
              id: 'accidents',
              title: 'Accidents',
              icon: '',
              iconImage: 'assets/img/icon/accident.png',
              data: [
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
              ],
            },
          },
          {
            name: 'challans',
            data: {
              id: 'challans',
              title: 'Challans',
              icon: '',
              iconImage: 'assets/img/icon/challan.png',
              data: [
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Sanand Railway Station - Pegasus Ahmadabad',
                  status: 'Load',
                  cost: '2200',
                  reson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  route: 'Pegasus Ahmadabad - Sanand Railway Station',
                  status: 'Empty',
                  cost: '2200',
                  reson: 'Unknown',
                },
              ],
            },
          },
          {
            name: 'vehicleHistory',
            data: {
              id: 'vehicleHistory',
              title: 'Vehicle History',
              icon: '',
              iconImage: 'assets/img/icon/truck.png',
              data: [
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
                {
                  vehicleNo: 'HR55R6334',
                  bodyType: 'TR8',
                  fromDate: '21/01/2022',
                  toDate: '24/02/2022',
                  time: '1 month, 3 days',
                  status: 'Not Active',
                  releavingReson: 'Unknown',
                },
              ],
            },
          },
        ],
      },
    },
  ];
  public sideInfoData: any = [];
  public profile: any = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    this.currentURL = window.location.href;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params.id = params.id;
      this.params.type = params.type;

      console.log(params);
    });
    // this.driverProfile = [
    //   {
    //     name: 'trips',
    //     data: {
    //       id: 'trips',
    //       title: 'Trips',
    //       icon: '',
    //       iconImage: 'assets/img/icon/trip.png',
    //       data: [
    //         {
    //           settlementNo: 'SN2122FTS3333',
    //           from: 'Sanand Railway Station',
    //           to: 'Pegasus Ahmadabad',
    //           freight: '6,240.00',
    //           expense: '2,929.12',
    //           profit: parseFloat('2765.88'),
    //         },
    //         {
    //           settlementNo: 'SN2122FTS3333',
    //           from: 'Pegasus Ahmadabad',
    //           to: 'Sanand Railway Station',
    //           freight: '0.00',
    //           expense: '929.12',
    //           profit: parseFloat('-929.12'),
    //         },
    //         {
    //           settlementNo: 'SN2122FTS3333',
    //           from: 'Pegasus Ahmadabad',
    //           to: 'Sanand Railway Station',
    //           freight: '2929.12',
    //           expense: '929.12',
    //           profit: parseFloat('2000.00'),
    //         },
    //         {
    //           settlementNo: 'SN2122FTS3333',
    //           from: 'Pegasus Ahmadabad',
    //           to: 'Sanand Railway Station',
    //           freight: '21200.00',
    //           expense: '12010.20',
    //           profit: parseFloat('9190.80'),
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     name: 'tyres',
    //     data: {
    //       id: 'tyres',
    //       title: 'Tyres',
    //       icon: '',
    //       iconImage: 'assets/img/icon/tyre.png',
    //       data: [
    //         {
    //           vehicleNo: 'HR55R6334',
    //           date: '22-02-2022',
    //           tyreCompany: 'Apollo',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Pata ni ku utara tha abhi yad ni h',
    //         },
    //         {
    //           vehicleNo: 'RJ55R6334',
    //           date: '21-02-2022',
    //           tyreCompany: 'MRF',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Apna kam kr na tujhe bdi panchayat krni h',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           date: '22-02-2022',
    //           tyreCompany: 'Apollo',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Pata ni ku utara tha abhi yad ni h',
    //         },
    //         {
    //           vehicleNo: 'RJ55R6334',
    //           date: '21-02-2022',
    //           tyreCompany: 'MRF',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Apna kam kr na tujhe bdi panchayat krni h',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           date: '22-02-2022',
    //           tyreCompany: 'Apollo',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Pata ni ku utara tha abhi yad ni h',
    //         },
    //         {
    //           vehicleNo: 'RJ55R6334',
    //           date: '21-02-2022',
    //           tyreCompany: 'MRF',
    //           tyreRun: '232KM',
    //           cpkm: '22',
    //           reson: 'Apna kam kr na tujhe bdi panchayat krni h',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     name: 'maintainance',
    //     data: {
    //       id: 'maintainance',
    //       title: 'Maintainance',
    //       icon: '',
    //       iconImage: 'assets/img/icon/maintainance.png',
    //       data: [
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           jcNo: 'DSWE2324234',
    //           date: '22-02-2022',
    //           maintainanceType: 'Repair',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     name: 'accidents',
    //     data: {
    //       id: 'accidents',
    //       title: 'Accidents',
    //       icon: '',
    //       iconImage: 'assets/img/icon/accident.png',
    //       data: [
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     name: 'challans',
    //     data: {
    //       id: 'challans',
    //       title: 'Challans',
    //       icon: '',
    //       iconImage: 'assets/img/icon/challan.png',
    //       data: [
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Sanand Railway Station - Pegasus Ahmadabad',
    //           status: 'Load',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           route: 'Pegasus Ahmadabad - Sanand Railway Station',
    //           status: 'Empty',
    //           cost: '2200',
    //           reson: 'Unknown',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     name: 'vehicleHistory',
    //     data: {
    //       id: 'vehicleHistory',
    //       title: 'Vehicle History',
    //       icon: '',
    //       iconImage: 'assets/img/icon/truck.png',
    //       data: [
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //         {
    //           vehicleNo: 'HR55R6334',
    //           bodyType: 'TR8',
    //           fromDate: '21/01/2022',
    //           toDate: '24/02/2022',
    //           time: '1 month, 3 days',
    //           status: 'Not Active',
    //           releavingReson: 'Unknown',
    //         },
    //       ],
    //     },
    //   },
    // ];
    this.profile = this.driverProfile[0].profile.personelProfile;
    for (
      let i = 0;
      i < this.driverProfile[0].profile.driverDetails.length;
      i++
    ) {
      this.sideInfoData.push(
        this.driverProfile[0].profile.driverDetails[i].data
      );
    }

    $('body').removeClass('modal-open');
    $('.modal-dialog').hide();
    $('.modal-backdrop').remove();
    var self = this;

    $('#profile').addClass('active');

    $('#imgInp').change(function () {
      self.readURL(this);
    });

    $('#input_btn').click(function () {
      $('#imgInp').trigger('click');
    });
  }

  showDetails(action: string) {
    this.activeSection = action;
    this.dataList = [];
    this.sideInfoData.forEach((item: any) => {
      if (item.id == action) this.dataList = item.data;
    });
    console.log(this.dataList);

    $('.side-card').removeClass('active');
    $('#' + action).addClass('active');
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      (<any>$('[data-toggle="tooltip"]')).tooltip({
        trigger: 'hover',
      });
    }, 100);
  }

  readURL(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#blah').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
