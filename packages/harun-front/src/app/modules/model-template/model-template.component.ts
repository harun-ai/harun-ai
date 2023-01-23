import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-template',
  templateUrl: './model-template.component.html',
  styleUrls: ['./model-template.component.scss']
})


export class ModelTemplateComponent implements OnInit {
  step = 1
  isLoading = false;
  isResult = false;
  
  constructor() {

  }

  ngOnInit(): void {
    
  }

  nextStep() {
    this.step ++;
  }

  previousStep() {
    this.step --;
  }

  generateTemplate() {
    this.isLoading = true;
    this.getResult();
  }
  
  getResult() {
    setTimeout(() => {
      this.isLoading = false;
      this.isResult = true;
    }, 4000);
    
  }
}
