import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatRadioModule} from '@angular/material/radio'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const modules = [
  MatRadioModule,
  MatSlideToggleModule
]

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    HeaderComponent,
    modules
  ]
})
export class SharedModule { }
