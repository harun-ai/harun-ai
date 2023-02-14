import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelTemplateComponent } from './model-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
// import { MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [ModelTemplateComponent, DialogComponent],
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
