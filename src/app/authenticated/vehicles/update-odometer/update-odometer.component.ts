import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DatatableFullComponent } from "../../shared/datatable-full/datatable-full.component";
import { LoadingService } from "src/app/services/loading.service";
import { BasicTasksService } from "src/app/services/basic-tasks.service";
import { NgForm } from "@angular/forms";
import { UpdateOdometerService } from "./update-odometer.service";

@Component({
  selector: "app-update-odometer",
  templateUrl: "./update-odometer.component.html",
  styleUrls: ["./update-odometer.component.css"],
})
export class UpdateOdometerComponent implements OnInit, AfterViewInit {
  @ViewChild(DatatableFullComponent) tableFull: any;
  @ViewChild("updateOdodmeterForm") form!: NgForm;
  @HostListener("window: resize", ["$event"]) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile: boolean = false;
  public mediaScreenSize: number = 768;
  public loading = false;

  public fields: any = {
    id: "",
    odometer: "",
    vehicle: "HR93827",
    effectiveDate: "",
  };

  public counterData: any = [];
  public tableColumns: any = [];
  public tableButtons: any = [];
  public optionData: any = {};

  constructor(
    private loader: LoadingService,
    private basictaskService: BasicTasksService,
    private service: UpdateOdometerService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.tableColumns = this.service.tableColumns;
    this.tableButtons = this.service.tableButtons;
    this.optionData = this.service.optionData;
    this.counterData = this.service.counterData;

    this.service.editEntry$.subscribe((res) => {
      this.editEntry(res);
    });
  }

  ngAfterViewInit(): void {
    this.basictaskService.highlightRequiredFields();
  }

  editEntry(rows: any) {
    this.form.resetForm();
    (<any>$("#updateOdometer")).modal("toggle");
  }

  viewDetails(data: any) {
    if (data.length == 1 || data.length == undefined) {
      (<any>$("#viewPageDetails")).modal("toggle");
    } else if (data.length == 0) {
      alert("Please select any entry to View Details.");
    } else {
      alert("Only one entry can be View at a time.");
    }
  }

  setValue(fieldName: any, value: any) {
    this.fields[fieldName] = value;
  }

  counterClickFunction(data: any) {
    let functionData = {
      url: "",
      data: data,
    };
    this.tableFull.reloadTableWithNewDataUrl(functionData);
  }

  checkScreenSize() {
    this.mobile = window.innerWidth >= 768 ? false : true;
  }
}
