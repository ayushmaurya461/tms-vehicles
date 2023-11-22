import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'data-counter',
  templateUrl: './data-counter.component.html',
  styleUrls: ['./data-counter.component.css'],
})
export class DataCounterComponent implements OnInit {
  @Input() data: any = [];
  @Output('counterClickFunction') counterClickFunction: any =
    new EventEmitter();
  @HostListener('window: resize', ['$event']) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile = true;
  public mediaScreenSize = 768;
  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  counterClickEvent(event: any, value: any) {
    $('.data-counter .Sales_Details_plan .single_plan').removeClass('active');
    if (
      $(event.target).parents('.data-counter .Sales_Details_plan .single_plan')
        .length == 0
    ) {
      $(event.target).addClass('active');
    } else {
      $(event.target)
        .parents('.data-counter .Sales_Details_plan .single_plan')
        .addClass('active');
    }
    this.counterClickFunction.emit(value);
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.mobile = width >= this.mediaScreenSize ? false : true;
  }
}
