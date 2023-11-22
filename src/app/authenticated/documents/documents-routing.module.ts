import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { DocumentMasterComponent } from './document-master/document-master.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentProvisionComponent } from './document-provision/document-provision.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'document-master',
    component: DocumentMasterComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Document Master',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'add-document',
    component: AddDocumentComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Add Document',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'document-provision',
    component: DocumentProvisionComponent,
    canActivate: [AuthGuard],
    data: {
      title: ' Document Provision',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
