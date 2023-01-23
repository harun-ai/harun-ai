import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ModelTemplateComponent } from './modules/model-template/model-template.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'model-template', component: ModelTemplateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
