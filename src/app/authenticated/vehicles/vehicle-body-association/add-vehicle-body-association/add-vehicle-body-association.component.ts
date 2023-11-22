import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TabEnterService } from 'src/app/services/tab-enter.service';

@Component({
  selector: 'app-add-vehicle-body-association',
  templateUrl: './add-vehicle-body-association.component.html',
  styleUrls: ['./add-vehicle-body-association.component.css'],
})
export class AddVehicleBodyAssociationComponent implements OnInit {
  @ViewChild('vehicleBodyAssociation') module!: NgForm;

  public userOptions: any = [
    { id: 1, text: 'Admin' },
    { id: 2, text: 'LocalUser' },
    { id: 3, text: 'User' },
    { id: 4, text: 'ABC User' },
  ];
  public fields: any = {
    id: 0,
    bodyNo: '',
    vehicleNo: '',
    assignDate: '',
    unassignDate: '',
    user: '',
  };
  constructor(public tabEnterService: TabEnterService) {}

  ngOnInit(): void {}

  addEntry() {
    this.module.resetForm();
    this.fields.id = 0;
    (<any>$('#addVehicleBodyAssociation')).modal('toggle');
  }

  setValue(fieldName: string, value: any) {
    this.fields[fieldName] = value;
  }
}
