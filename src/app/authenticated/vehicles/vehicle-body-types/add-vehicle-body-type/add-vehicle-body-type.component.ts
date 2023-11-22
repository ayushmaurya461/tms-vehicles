import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasicTasksService } from 'src/app/services/basic-tasks.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-add-vehicle-body-type',
  templateUrl: './add-vehicle-body-type.component.html',
  styleUrls: ['./add-vehicle-body-type.component.css'],
})
export class AddVehicleBodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChild('vehicleBodyType') vehicleBodyType!: NgForm;
  @Output('onSubmit') onSubmit: any = new EventEmitter();

  public loading: boolean = false;
  public segmentOptions: any = [];
  public bodyAttachmentOptions: any = [];
  public districtOptions: any = [];
  public subDistrictOptions: any = [];
  public parentIdOptions: any = [];
  public applicableForOptions: any = [];
  public bodyTypeOptions: any = [];
  public attachmentOptions: any = [];
  public tyresOptions: any = [];

  public fields: any = {
    id: 0,
    name: '',
    altName: '',
    segment: '',
    bodyAttachment: [''],
    applicableFor: '',
    bodyType: '',
    tyres: 0,
  };

  constructor(
    private loader: LoadingService,
    private http: HttpService,
    private notification: NotificationService,
    private basictaskService: BasicTasksService,
    public tabEnterService: TabEnterService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.loader.show();
    this.segmentOptions = [
      'Car Carrier',
      'Bike Carrier',
      'Market Load',
      'Gas Tanker',
      'Oil Tanker',
    ];

    this.tyresOptions = [2, 4, 6, 8, 10, 12, 14];

    this.bodyAttachmentOptions = ['Yes', 'No'];

    this.applicableForOptions = [
      { id: 1, text: 'Own' },
      { id: 2, text: 'Hired' },
    ];

    this.bodyTypeOptions = ['Open', 'Closed', 'Modified'];
    this.attachmentOptions = ['Yes', 'No'];
  }

  ngAfterViewInit(): void {
    this.basictaskService.highlightRequiredFields();
  }

  setValue(value: any, fieldName: string) {
    this.fields[fieldName] = value;
  }

  addEntry() {
    this.vehicleBodyType.resetForm();
    this.fields.id = 0;
    (<any>$('#addVehicleBodyType')).modal('toggle');
  }

  editEntry(id: string | number) {
    this.vehicleBodyType.resetForm();
    (<any>$('#addVehicleBodyType')).modal('toggle');

    // if (id && id != '' && id != 0) {
    //   this.vehicleBodyType.resetForm();
    //   this.loading = true;
    //   this.loader.show();
    //   this.http.postRequestWithHeaders('city/get', { id: id }).subscribe(
    //     (response: any) => {
    //       if (response && response.status) {
    //         let data = response.response.data;
    //         this.fields.id = data.id;
    //         this.fields.name = data.name;
    //         this.fields.altName = data.alternate_name;
    //         this.fields.country = [data.country_id];
    //         this.fields.state = [data.state_id];
    //         this.fields.district = [data.district_id];
    //         this.fields.subDistrict = [data.subdistrict_id];
    //         this.fields.pincode = data.pin_code;
    //         this.fields.latitude = data.latitude;
    //         this.fields.longitude = data.longitude;
    //         this.fields.parentId = data.parent_id;
    //         (<any>$('#addVehicleBodyType')).modal('toggle');
    //         this.loading = false;
    //         this.loader.hide();
    //       } else {
    //         this.notification.error(
    //           'Something went wrong, please try after sometime'
    //         );
    //       }
    //     },
    //     (error: any) => {
    //       this.loading = false;
    //       this.loader.hide();
    //       this.notification.apiError(error);
    //     }
    //   );
    // } else {
    //   alert('Something went wrong, please try after sometime');
    // }
  }

  submitVehicleBodyTypeDetails(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.loader.show();
      let body: any = {
        id: this.fields.id,
        name: form.value.name,
        alternate_name: form.value.altName,
        country_id: form.value.country[0],
        state_id: form.value.state[0],
        district_id: form.value.district[0],
        subdistrict_id: form.value.subDistrict[0],
        pin_code: form.value.pincode,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        parent_id: form.value.parentId ? form.value.parentId[0] : 0,
      };

      let action: string = 'add';

      if (this.fields.id && this.fields.id != 0) {
        action = 'update';
      }
      this.http.postRequestWithHeaders('city/' + action, body).subscribe(
        (response: any) => {
          if (response && response.status) {
            this.onSubmit.emit();
            (<any>$('#addCity')).modal('hide');
            form.resetForm();
            this.loading = false;
            this.loader.hide();
            this.notification.apiSuccess(response);
          }
        },
        (error: any) => {
          this.loading = false;
          this.loader.hide();
          this.notification.apiError(error);
        }
      );
    }
  }
}
