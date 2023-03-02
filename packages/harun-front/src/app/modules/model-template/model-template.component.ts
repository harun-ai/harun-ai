import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/shared/services/template.service';
import { DialogCancelComponent } from './dialog-cancel/dialog-cancel.component';
import { DialogComponent } from './dialog/dialog.component';
import { EmailTemplateComponent } from './email-template/email-template.component';

@Component({
  selector: 'app-model-template',
  templateUrl: './model-template.component.html',
  styleUrls: ['./model-template.component.scss']
})

export class ModelTemplateComponent implements OnInit {
  step = 1
  isResult = false;
  // modelTemplate: any;
  isLoading = false;
  textResult = '';
  fileUrl: any;
  modelTemplate: any;
  stepTemplate: any;
  objSend: any = {};
  idTemplate: any
  responseTemplate: any;
  skip = true;
  modelName: string;
  prediction: any;
  constructor(
    private templateService: TemplateService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.idTemplate = this.router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {
    this.getTemplate(this.idTemplate)
  }

  getTemplate(idTemplate: string) {
    this.templateService.getTemplateModel(idTemplate).subscribe(
      (data: any) => {
        console.log(data);

        this.responseTemplate = data.success.inputSchema;
        this.modelName = data.success.name;
        let response = data.success.inputSchema.properties;
        console.log('this.responseTemplate', this.responseTemplate);
        this.modelTemplate = Object.getOwnPropertyNames(response).map(
          (key) => (
            {
              title: response[key].title,
              index: response[key].sequenceNumber,
              key,
              type: response[key].type,
              enum: response[key].enum,
              description: response[key].description
            }
          )
        )

        Object.keys(response)
        console.log(this.modelTemplate);

        this.defineStep()
      }
    );

  }
  defineStep() {
    this.modelTemplate.forEach((element: any) => {

      if (this.step == (element.index + 1)) {
        if (element.enum) {
          this.objSend[element.key] = this.objSend[element.key] ? this.objSend[element.key] : element.enum[0]
        } else {
          this.objSend[element.key] = this.objSend[element.key] ? this.objSend[element.key] : '';
        }
        if (this.responseTemplate.required.includes(`${element.key}`)) {
          this.skip = false;
        }
        return this.stepTemplate = element;
      }

    });
    console.log('this.stepTemplate', this.stepTemplate);
  }

  nextStep() {
    this.step++;
    this.defineStep();
    console.log('this.objSend', this.objSend);

    console.log('this.step', this.step);
  }

  previousStep() {
    this.step--;
    this.defineStep();
    console.log('this.step', this.step);
  }

  generateTemplate() {
    this.isLoading = true;
    this.getResult();
  }

  getResult() {
    console.log('this.objSend', this.objSend);
    const payload = this.objSend;
    this.templateService.postTemplateModel(this.idTemplate, payload).subscribe(
      data => {
        console.log('data', data);
        this.prediction = data.success;
        this.textResult = data.success.result;
        this.isLoading = false;
        this.isResult = true;
      }
    )


  }

  exportTxt() {
    const data = this.textResult;
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        obj: this.stepTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cancel() {
    const dialogRef = this.dialog.open(DialogCancelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.router.navigate([''])
      }
    });

  }
  goToHome() {
    this.router.navigate([''])
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.textResult;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    const messageTextCopied = document.getElementById('textCopy')
    messageTextCopied?.classList.add('d-block')
    setTimeout(() => {
      messageTextCopied?.classList.remove('d-block')
    }, 2000);
  }

  generateAgain() {
    window.location.reload();
  }

  backToModelTemplate() {
    this.isResult = false;
    this.step = 1
    this.defineStep();
  }

  feedback(like: boolean) {
    const payload = {
      predictionId: this.prediction.id,
      liked: like
    }
    this.templateService.postFeedback(payload).subscribe(
      data => {
        console.log('data#######################', data);
      }
    )
  }
}
