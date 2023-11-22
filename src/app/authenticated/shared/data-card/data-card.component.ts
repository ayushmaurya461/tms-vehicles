import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounce } from 'lodash';
import { LoadingService } from 'src/app/services/loading.service';
import { DataCardService } from './data-card.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';
import { CurrentStateService } from 'src/app/services/currentState.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css'],
})
export class DataCardComponent implements OnInit, AfterViewInit {
  @ViewChild('inputSearch') input!: string;
  @ViewChild(ShowDetailsComponent) showDetailsComponent: any;
  @ViewChild('printPreviewContainer')
  printPreviewContainer!: ElementRef<HTMLDivElement>;

  @Input() icon!: any;
  @Input() buttons: any[] = [];
  @Input() optionData: any = {};
  @Input() columns: any = [];
  @Input() cardTitle: string = 'Title';

  @Output() showFullDetailsPage: EventEmitter<any> = new EventEmitter<any>();

  dataList: any[] = [];
  details: any = {};
  listWithIndexes!: any[];
  body = {
    length: 10,
    start: 0,
    search: {
      value: '',
      regex: false,
    },
  };

  currentDetails: any = '';
  valueForSearch = '';
  page = 1;
  totalRecords = 0;

  listLoading = false;
  loadMore = true;
  autoHide = true;
  showDetails = false;
  showScrollButton = false;
  noRecordsFound = false;

  constructor(
    private loader: LoadingService,
    private currentState: CurrentStateService,
    private dataCardService: DataCardService
  ) {}

  ngOnInit() {
    this.loader.show();
    this.showDetails = false;
    this.dataCardService.fetchData(this.optionData, this.body, this.columns);
    this.dataList = this.dataCardService.dataList;
    $('.btn-controls').empty();
    this.dataCardService.headerButtons(
      this.buttons,
      this.columns,
      this.optionData
    );
    if (this.dataCardService.noRecordsFound) {
      this.noRecordsFound = true;
    }
  }

  ngAfterViewInit(): void {}

  loadMoreData() {
    this.listLoading = this.loadMore = this.dataCardService.loadMore;
    this.body.start = this.body.start + 10;
    this.dataCardService.loadMoreData(this.optionData, this.body, this.columns);
  }

  // Load On Scroll -------------------------------------------------------------

  debouncedOnScroll = debounce(() => {
    this.listLoading = this.dataCardService.listLoading;
    const container = document.querySelector('.list-container');
    const scrollHeight = container?.scrollHeight;
    const scrollTop = container?.scrollTop;
    const clientHeight = container?.clientHeight;
    const isLastReached = scrollTop! + clientHeight! >= scrollHeight!;
    this.showScrollButton = scrollTop! > 1000 ? true : false;

    if (isLastReached) {
      if (this.loadMore) this.loadMoreData();
      this.listLoading = this.loadMore = this.dataCardService.loadMore;
    }
  }, 500);

  onScroll() {
    this.debouncedOnScroll();
  }

  scrollToTop() {
    const element = document.querySelector('.list-container');
    if (element) {
      element.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  // Search From Data

  search(val: HTMLInputElement) {
    val.value == ''
      ? (this.body = {
          length: 10,
          start: 0,
          search: {
            value: val.value,
            regex: false,
          },
        })
      : (this.body.search = {
          value: val.value,
          regex: false,
        });
    if (this.body.search) {
      this.dataCardService.fetchData(this.optionData, this.body, this.columns);
      this.dataList = this.dataCardService.dataList;
      this.listLoading = false;
    }
  }

  // View All Details

  viewDetails(index: any) {
    if (this.optionData.showBasicDetailsPage == false) {
      this.currentState.setData(this.dataCardService.listWithIndexes[index]);
      this.currentState.getData().subscribe((data) => {
        this.currentDetails = data[0];
        this.showFullDetailsPage.emit(data);
      });
    }
    if (this.optionData.showBasicDetailsPage == true) {
      this.details = {
        title: this.optionData.url,
        data: this.dataCardService.listWithIndexes[index],
      };
      this.showDetails = true;
      this.currentState.setData(this.dataCardService.listWithIndexes[index]);
      this.currentState.getData().subscribe((data) => {
        this.currentDetails = data;
      });
    }

    // this.details = this.dataCardService.details;
    // this.showDetails = this.dataCardService.showDetails;
    // this.currentDetails = this.dataCardService.currentDetails;
    // this.showFullDetailsPage.emit(this.currentDetails);
  }
  closedDetails() {
    this.showDetails = false;
    this.details = {
      titlle: null,
      data: null,
    };
  }
}
