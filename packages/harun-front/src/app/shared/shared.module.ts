import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemplateService } from './services/template.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
const materialModules = [
  MatRadioModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule
]

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    
    ReactiveFormsModule,
    CommonModule,
    materialModules,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    materialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TemplateService,
    HttpClient
  ]
})
export class SharedModule { }
