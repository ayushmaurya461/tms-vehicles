import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticatedRoutingModule } from "./authenticated-routing.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { INgxSelectOptions, NgxSelectModule } from "ngx-select-ex";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxPrintModule } from "ngx-print";
import { NgxMaskModule } from "ngx-mask";
import { QrCodeModule } from "ng-qrcode";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";

import { AuthenticatedComponent } from "./authenticated.component";
import { ChatWindowComponent } from "./shared/chat-window/chat-window.component";
import { DataCardComponent } from "./shared/data-card/data-card.component";
import { DataCounterComponent } from "./shared/data-counter/data-counter.component";
import { DatatableFullComponent } from "./shared/datatable-full/datatable-full.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { FavouritesComponent } from "./shared/favourites/favourites.component";
import { HeaderComponent } from "./shared/header/header.component";
import { InputFileComponent } from "./shared/form-fields/input-file/input-file.component";
import { InputTelComponent } from "./shared/form-fields/input-tel/input-tel.component";
import { MobileFooterComponent } from "./shared/mobile-footer/mobile-footer.component";
import { NotificationsComponent } from "./shared/notifications/notifications.component";
import { PageTitleBarComponent } from "./shared/page-title-bar/page-title-bar.component";
import { ProfileScreenComponent } from "./shared/profile-screen/profile-screen.component";
import { SelectComponent } from "./shared/form-fields/select/select.component";
import { Select2Component } from "./shared/form-fields/select2/select2.component";
import { ShowDetailsComponent } from "./shared/show-details/show-details.component";
import { SideInfoCardComponent } from "./shared/profile-screen/side-info-card/side-info-card.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

import { ExpandCollapseMenuDirective } from "./shared/sidebar/expand-collapse-menu.directive";
import { NavCardsComponent } from "./shared/nav-cards/nav-cards.component";
import { UpdateOdometerComponent } from "./vehicles/update-odometer/update-odometer.component";
import { VehicleAverageLogComponent } from "./vehicles/vehicle-average-log/vehicle-average-log.component";
import { VehicleBodyAssociationComponent } from "./vehicles/vehicle-body-association/vehicle-body-association.component";
import { AddVehicleBodyAssociationComponent } from "./vehicles/vehicle-body-association/add-vehicle-body-association/add-vehicle-body-association.component";
import { VehicleBodyTypesComponent } from "./vehicles/vehicle-body-types/vehicle-body-types.component";
import { AddVehicleBodyTypeComponent } from "./vehicles/vehicle-body-types/add-vehicle-body-type/add-vehicle-body-type.component";
import { VehicleDetailsComponent } from "./vehicles/vehicle-details/vehicle-details.component";
import { AddVehicleDetailsComponent } from "./vehicles/vehicle-details/add-vehicle-details/add-vehicle-details.component";
import { VehicleLaneComponent } from "./vehicles/vehicle-lane/vehicle-lane.component";
import { VehicleMasterComponent } from "./vehicles/vehicle-master/vehicle-master.component";
import { BodyDetailsComponent } from "./vehicles/vehicle-master/body-details/body-details.component";
import { VehicleBrandsComponent } from "./vehicles/vehicle-master/vehicle-brands/vehicle-brands.component";
import { VehicleModelsComponent } from "./vehicles/vehicle-master/vehicle-models/vehicle-models.component";
import { VehicleSegmentsComponent } from "./vehicles/vehicle-master/vehicle-segments/vehicle-segments.component";
import { VehicleTargetComponent } from "./vehicles/vehicle-target/vehicle-target.component";
import { AddDocumentComponent } from "./documents/add-document/add-document.component";
import { AddNewDocumentComponent } from "./documents/add-document/add-new-document/add-new-document.component";
import { PassEntryComponent } from "./documents/add-document/pass-entry/pass-entry.component";
import { DocumentMasterComponent } from "./documents/document-master/document-master.component";
import { AddDocumentMasterComponent } from "./documents/document-master/add-new-document-master/add-document-master.component";
import { DocumentProvisionComponent } from "./documents/document-provision/document-provision.component";
import { DocumentProvisionDetailsComponent } from "./documents/document-provision-details/document-provision-details.component";
import { PrepaidExpenseComponent } from "./documents/prepaid-expense/prepaid-expense.component";
import { AddVehicleBodyDetailsComponent } from "./vehicles/vehicle-master/body-details/add-vehicle-body-details/add-vehicle-body-details.component";

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: "id",
  optionTextField: "name",
  keepSelectedItems: false,
};

@NgModule({
  declarations: [
    AuthenticatedComponent,
    ChatWindowComponent,
    DatatableFullComponent,
    DataCardComponent,
    DataCounterComponent,
    ExpandCollapseMenuDirective,
    FavouritesComponent,
    FooterComponent,
    HeaderComponent,
    InputFileComponent,
    InputTelComponent,
    MobileFooterComponent,
    NavCardsComponent,
    NotificationsComponent,
    PageTitleBarComponent,
    ProfileScreenComponent,
    Select2Component,
    SelectComponent,
    ShowDetailsComponent,
    SidebarComponent,
    SideInfoCardComponent,
    UpdateOdometerComponent,
    VehicleAverageLogComponent,
    VehicleBodyAssociationComponent,
    AddVehicleBodyAssociationComponent,
    VehicleBodyTypesComponent,
    AddVehicleBodyTypeComponent,
    VehicleDetailsComponent,
    AddVehicleDetailsComponent,
    VehicleLaneComponent,
    VehicleMasterComponent,
    BodyDetailsComponent,
    AddVehicleDetailsComponent,
    VehicleBrandsComponent,
    VehicleModelsComponent,
    VehicleSegmentsComponent,
    VehicleTargetComponent,
    AddDocumentComponent,
    AddNewDocumentComponent,
    PassEntryComponent,
    DocumentMasterComponent,
    AddDocumentMasterComponent,
    DocumentProvisionComponent,
    DocumentProvisionComponent,
    DocumentProvisionDetailsComponent,
    PrepaidExpenseComponent,
    AddVehicleDetailsComponent,
    AddVehicleBodyDetailsComponent,
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    NgxMaskModule.forRoot(),
    HttpClientModule,
    NgxIntlTelInputModule,
    NgxPrintModule,
    QrCodeModule,
    NgxPaginationModule,
  ],
})
export class AuthenticatedModule {}
