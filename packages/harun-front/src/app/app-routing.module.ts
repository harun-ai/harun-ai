import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { EmailTemplateComponent } from './modules/model-template/email-template/email-template.component';
import { ModelTemplateComponent } from './modules/model-template/model-template.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'model-template', component: ModelTemplateComponent },
  { path: 'email-template', component: EmailTemplateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
