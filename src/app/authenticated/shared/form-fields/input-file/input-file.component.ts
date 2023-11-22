import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent implements OnInit, OnChanges {
  [key: string]: any;
  public fileName: any = 'Choose File';

  constructor() {}

  @Input() selectedFile: any;
  @Input() filesToUpload: any;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  @Output('onFileSelect') onFileSelect: any = new EventEmitter();

  ngOnInit(): void {
    $(document).on('click', '.imageToPreview', function () {
      let image = $(this);
      $('#imagePreview').attr('src', '' + image.attr('src'));
    });
    $(document).on('click', '.deleteButtonInImagePreview', (event) => {
      let varname = event.target.dataset.varname;
      let index = event.target.dataset.index;
      let files = Array.from(this.filesToUpload);
      files.splice(index, 1);
      this.filesToUpload = files;
      this.onFileSelect.emit(files);
      this.viewImagePreview(this.filesToUpload, varname);
      $('#' + varname + '-count').text(files.length);
      if (files.length == 0) {
        $('#' + varname).val('');
        this.fileName = 'Choose File';
      }
    });
  }

  ngOnChanges() {
    if (!this.selectedFile) {
      this.filesToUpload = null;
      $('#' + this.id + '-count').text(0);
    }
  }

  triggerInput(id: string) {
    $('#' + id).trigger('click');
  }

  onFileSelected(event: any) {
    $(event.target.id).val('');
    this.filesToUpload = event.target.files;
    this.onFileSelect.emit(event.target.files);
    this.fileName = event.target.files[0].name;
    $('#' + this.id + '-count').text(event.target.files.length);
  }

  viewImagePreview(filesToPreview: any, varName: string) {
    let files: FileList = filesToPreview;
    let length = filesToPreview?.length ? filesToPreview?.length : 0;
    if (length) {
      for (let i = 0; i < length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function () {
          if (i == 0) {
            $('.imagePreviewMainView').html(
              '<img src="' +
                reader.result +
                '" id="imagePreview" alt="Image Preview">'
            );
            $('.imagePreviewSideView').html(
              '<div style="position:relative;"><img src="' +
                reader.result +
                '" class="imageToPreview" alt="Image Preview"><i class="ti-trash deleteButtonInImagePreview" data-varname="' +
                varName +
                '" data-index="' +
                i +
                '"></i></div>'
            );
          } else {
            $('.imagePreviewSideView').append(
              '<div style="position:relative;"><img src="' +
                reader.result +
                '" class="imageToPreview" alt="Image Preview"><i class="ti-trash deleteButtonInImagePreview" data-varname="' +
                varName +
                '" data-index="' +
                i +
                '"></i></div>'
            );
          }
        };
      }
    } else {
      $('.imagePreviewMainView').html(
        '<p style="color:white;">No file choosen, Please select the file first to see preview.</p>'
      );
      $('.imagePreviewSideView').html('');
    }
  }

  removeSelectedFile(index: number) {
    this.filesToUpload.splice(index, 1);
  }
}
