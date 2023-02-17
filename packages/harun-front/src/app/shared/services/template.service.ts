import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  configUrl="https://harun-ai-api-stg.herokuapp.com/model/0de728f2-1306-450a-b3a8-d67df56fa22e"

  constructor(
    private http: HttpClient
  ) { }
  
  getTemplateModel() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-HttpHeaders': 'Content-Type',
      'Authorization': 'Bearer Fe26.2*1*ebf5418ae831d55352f183af0066dd2a758fd5718a6bcc9377b5f41c3fe2c605*UqBi6U-5U8TW9-gJOJFyug*1_OwXBT0HoYWdR3L0BDascLjAzIN1Pkd3mIHGsvX1eRH8uhNshTBbiywKDNEGv62lE2zlwcwHJDuyAiXosX5JCgUrKkSAHTEw6iozmqOiWE-8pQjdPdO958PY1_7DKt4G0_qepIz50pGU09HcN7g_i49_pv8AiG9FLbevuoDQ_JUSpJLq9no27VCBwfxFy4hODMYlvn0na0FNsynY0yuuZTWFLoffumXXA5MJa_-XiimLxB5wf2Xu6lMtRNDCp1QubbYb-NAWKQ7Z6M6h8lUAw*1676678924381*644c0880e1600d8747a1631469057b341fc4268f7ddd2ddfb599b92a570f1779*6hqtJWlcqYpmSsbx17Z0V1QUOtjuOH6EdWXlY-zEeXU~2',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(this.configUrl, requestOptions)  
  }
}
