import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BasicTasksService } from 'src/app/services/basic-tasks.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-add-vehicle-details',
  templateUrl: './add-vehicle-details.component.html',
  styleUrls: ['./add-vehicle-details.component.css'],
})
export class AddVehicleDetailsComponent implements OnInit, AfterViewInit {
  public loading = false;
  public fields: any = {
    vehicleId: '',
    id: '',
    vehicleType: '',
    vehicleTypeUsage: '',
    branch: '',
    ownership: '',
    owner: '',
    brand: '',
    regNo: '',
    chasisNo: '',
    model: '',
    engineNo: '',
    bodyType: '',
    modelTyres: '',
    bodyTyres: '',
    mfgYear: '',
    regDate: '',
    manualOdometer: '',
    tmsOdometer: '',
    gpsOdometer: '',
    fuelType: '',
    fuelTank: '',
    avgWithLoad: '',
    avgWithoutLoad: '',
    maxFillCapacity: '',
    gearBox: '',
    engineType: '',
    vehicleStatus: '',
    addBlue: '',
    bharatStage: '',
    gps: '',
    frontImage: '',
    rightImage: '',
    backImage: '',
    leftImage: '',
  };

  public vehicleTypeOptions: any = [];
  public ownershipOptions: any = [];
  public vehicleTypeUsageOptions: any = [];
  public branchOptions: any = [];
  public ownerOptions: any = [];
  public brandOptions: any = [];
  public modelOptions: any = [];
  public bodyTypeOptions: any = [];
  public yearOptions: any = [];
  public fuelOptions: any = [];
  public vehicleStatusOptions: any = [];
  public gpsOptions: any = [];
  public adblueOptions: any = [];
  public bharatStageOptions: any = [
    { id: '0', text: 'BSIII' },
    { id: '1', text: 'BSIV' },
    { id: '2', text: 'BSVI' },
  ];

  constructor(
    public tabEnterService: TabEnterService,
    public loader: LoadingService,
    public basictaskService: BasicTasksService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.vehicleTypeOptions = [
      { id: 0, text: 'Car' },
      { id: 1, text: 'Bike' },
      { id: 2, text: 'Bus' },
      { id: 3, text: 'Truck' },
      { id: 4, text: 'Machine' },
    ];
    this.vehicleTypeUsageOptions = ['Personal', 'Commercial', 'Contract'];
    this.branchOptions = ['Delhi', 'Gurugram', 'Palwal', 'Gwalior'];
    this.ownershipOptions = ['Owned', 'Partnership', 'Hired'];
    this.ownerOptions = ['Akhil', 'Demo', 'Naresh', 'Sonu'];
    this.brandOptions = ['Tata', 'Mahindra', 'Toyota'];
    this.modelOptions = ['HI23', 'KSA32', 'TKSA21', 'LOL23'];
    this.bodyTypeOptions = ['TK54', 'LO08', 'LKI76', 'JH89'];
    this.yearOptions = [
      2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
      2022, 2023,
    ];

    this.fuelOptions = ['Petrol', 'Diesel', 'CNG', 'Hydrogen Gas'];
    this.vehicleStatusOptions = [
      'Active',
      'Deactivated',
      'Sold',
      'Not Under Observation',
    ];
    this.adblueOptions = ['Yes', 'No'];
    this.gpsOptions = [
      'Axestrack',
      'Etrans',
      'Emovil',
      'Srag',
      'Trimble',
      'Wheelseye',
    ];
  }

  ngAfterViewInit(): void {
    this.basictaskService.highlightRequiredFields();
  }

  setValue(fieldName: any, value: any) {
    this.fields[fieldName] = value;
  }

  addEntry() {
    (<any>$('#addVehicleDetails')).modal('toggle');
  }

  editEntry(data: any) {
    (<any>$('#addVehicleDetails')).modal('toggle');
  }
  submitVehicleDetails(vehicleDetails: any) {
    console.log(this.fields);

    console.log(vehicleDetails);
  }
}
