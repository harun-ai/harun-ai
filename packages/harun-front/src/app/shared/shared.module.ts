import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemplateService } from './services/template.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatRadioModule,
  MatSlideToggleModule
]

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    modules,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    modules,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TemplateService,
    HttpClient
  ]
})
export class SharedModule { }
