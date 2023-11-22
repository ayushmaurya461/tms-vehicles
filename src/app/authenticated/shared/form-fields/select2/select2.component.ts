import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { INgxSelectOption } from 'ngx-select-ex';
import { NgxSelectComponent } from 'ngx-select-ex';

@Component({
  selector: 'select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
})
export class Select2Component {
  @Input() options: any = [];
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  @Input() allowClear: boolean = false;
  @Input() autoSelect: boolean = false;
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() isFocused: boolean = false;
  @Input() selectionCounter: boolean = false;
  @Input() selectedData: any = [];
  @Input() prevElement: any = {};
  @Input() nextElement: any = {};

  @Output('onChange') onChange: any = new EventEmitter();

  public disableShiftFocus: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public inputTyped = (source: string, text: string) => {
    let evt: any = event;
    evt.preventDefault();
    if (!this.disableShiftFocus) {
      if ((evt?.key == 'Tab' || evt.keyCode == 9) && evt.shiftKey) {
        if (
          this.prevElement.id &&
          this.prevElement.id != '' &&
          this.prevElement.type &&
          this.prevElement.type != ''
        ) {
          if (
            this.prevElement.type == 'text' ||
            this.prevElement.type == 'number'
          ) {
            $('#' + this.prevElement.id).focus();
          } else if (this.prevElement.type == 'select') {
            $('#' + this.prevElement.id + ' .ngx-select').focus();
          }
        }
      }
    }
    this.disableShiftFocus = false;
  };

  public doFocus = (id: string) => {
    let evt: any = event;
    if (
      $(evt.relatedTarget).attr('class') != 'ngx-select__search form-control'
    ) {
      this.disableShiftFocus = true;
    }
    $('#' + id + ' .ngx-select__toggle').trigger('click');
    // console.log('SingleDemoComponent.doFocus',);
  };

  public doBlur = () => {
    // console.log('SingleDemoComponent.doBlur');
  };

  public doOpen = (id: string) => {
    $('#' + id + ' .ngx-select_multiple .ngx-select__selected').removeClass(
      'show'
    );
    setTimeout(function () {
      $('#' + id + ' .ngx-select__choices > li a').each(function () {
        $(this).attr('tabindex', '-1');
      });
    }, 1000);
    // console.log('SingleDemoComponent.doOpen',);
  };

  public doClose = () => {
    let evt: any = event;

    if (
      (this.selectedData == 0 || this.selectedData === '0') &&
      this.autoSelect
    ) {
      this.selectedData = [this.options[0]?.id];
    }

    if (evt.type == 'keydown') {
      if (this.nextElement.type == 'select') {
        $('#' + this.nextElement.id + ' .ngx-select').focus();
      } else {
        setTimeout(() => {
          $('#' + this.nextElement.id).focus();
        }, 10);
      }
    }
  };

  public doCloseTab = (id: any, sc: NgxSelectComponent) => {
    const co = sc.optionActive;
    let evt: any = event;
    if ((evt.key == 'Tab' || evt.keyCode == 9) && this.multiple == false) {
      this.selectedData = [co.value];
    }
    // if (evt?.key == 'Tab' || evt.keyCode == 9) {
    //   if (this.nextElement.type == 'select') {
    //     $('#' + this.nextElement.id + ' .ngx-select').focus();
    //   } else {
    //     setTimeout(() => {
    //       $('#' + this.nextElement.id).focus();
    //     }, 10);
    //   }
    // }
  };

  public doSelect = (value: any) => {
    // console.log('SingleDemoComponent.doSelect', value);
  };

  public doRemove = (value: any) => {
    // console.log('SingleDemoComponent.doRemove', value);
  };

  public doSelectOptions = (options: INgxSelectOption[], id: string) => {
    $('#selected-options-count.' + id).text(options.length);
    let data: any = [];
    options.forEach((option: any) => {
      data.push(option.value);
    });
    this.onChange.emit(data);
    if (options.length == 0) {
      $('#' + id + ' .ngx-select_multiple .ngx-select__selected').removeClass(
        'show'
      );
    }
  };

  public showSelectedOptions(id: string) {
    $('#' + id + ' .ngx-select_multiple .ngx-select__selected').toggleClass(
      'show'
    );
  }
}
