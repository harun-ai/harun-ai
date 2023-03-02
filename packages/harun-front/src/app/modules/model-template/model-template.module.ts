import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelTemplateComponent } from './model-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { DialogCancelComponent } from './dialog-cancel/dialog-cancel.component';
// import { MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [ModelTemplateComponent, DialogComponent, EmailTemplateComponent, DialogCancelComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    ModelTemplateComponent
  ],
  // providers: [
  //   MatDialogRef
  // ]
})
export class ModelTemplateModule { }
