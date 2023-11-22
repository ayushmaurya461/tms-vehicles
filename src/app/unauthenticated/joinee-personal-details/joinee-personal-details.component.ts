import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicTasksService } from 'src/app/services/basic-tasks.service';

@Component({
  selector: 'app-joinee-personal-details',
  templateUrl: './joinee-personal-details.component.html',
  styleUrls: ['./joinee-personal-details.component.css'],
})
export class JoineePersonalDetailsComponent implements OnInit {
  public filename = 'Choose File';

  public searchStr: string =
    this._activatedRoute.snapshot.paramMap.get('search') ?? '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private basicTaskService: BasicTasksService
  ) {}

  ngOnInit(): void {
    this.searchStr = this._activatedRoute.snapshot.paramMap.get('search') ?? '';
    this.searchStr = atob(this.searchStr);
  }
  ngAfterViewInit(): void {
    this.basicTaskService.highlightRequiredFields();
  }

  triggerFileInput() {
    $('#resume').trigger('click');
  }

  fileSelect(value: any) {
    if (value.target.files) this.filename = value.target.files[0].name;
  }

  submitForm(form: NgForm) {
    console.log(form.value);
  }
}
