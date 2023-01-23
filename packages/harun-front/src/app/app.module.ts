import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ModelTemplateModule } from './modules/model-template/model-template.module';

const modules = [
  SharedModule,
  DashboardModule,
  ModelTemplateModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }