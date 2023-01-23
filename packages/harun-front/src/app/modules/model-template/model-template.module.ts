import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelTemplateComponent } from './model-template.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ModelTemplateComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ModelTemplateComponent
  ]
})
export class ModelTemplateModule { }
