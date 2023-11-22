import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasicTasksService } from 'src/app/services/basic-tasks.service';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-add-vehicle-body-details',
  templateUrl: './add-vehicle-body-details.component.html',
  styleUrls: ['./add-vehicle-body-details.component.css'],
})
export class AddVehicleBodyDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('vehicleBodyDetails') module!: NgForm;

  public bodyTypeOptions = [
    { id: 1, text: 'ABC2' },
    { id: 2, text: 'UG&W' },
    { id: 3, text: 'ZVS3' },
    { id: 4, text: 'IUQB1' },
  ];

  fields: any = {
    id: 0,
    bodyType: '',
    noOfAxle: 0,
    bodyNo: '',
    chassisNo: '',
    noOfTyres: 0,
    odometer: '',
    manufacturerName: '',
  };

  constructor(
    public tabEnterService: TabEnterService,
    private basictaskService: BasicTasksService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.basictaskService.highlightRequiredFields();
  }

  addEntry() {
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$('#addVehicleBodyDetails')).modal('toggle');
  }

  setValue(fieldName: string, value: any) {
    this.fields[fieldName] = value;
  }

  submitForm(data: any) {
    console.log(data.value);
  }
}
