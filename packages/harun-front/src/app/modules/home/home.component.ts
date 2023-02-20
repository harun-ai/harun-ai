import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/shared/services/home.service';
// import { TemplateList } from 'src/app/shared/views/template-list.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  templates: any;
  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
  }
  ngOnInit(): void {

    this.homeService.getListTemplate().subscribe(
      (data: any) => {
        this.templates = data.success;
        console.log(this.templates);
      }
    );
  }

  goToModelTemplate(id: string) {
    console.log('id', id);
    this.router.navigate(['model-template'], {state: {data: id}})
  }

}
