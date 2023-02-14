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
      'Authorization': 'Bearer Fe26.2*1*cfadc85c7fae65e642753fea69ccf007c3764450812a074b283ca43659f0b678*LIVkS6pWJi0NAJZo5axxRA*r6JGaua7jYnHlFlyUUWFxOAXM_CnZpk-MmKFKIdtSYadk5ZWQcrFHNaQt6v_cINQ7C7lBQKVkeCaSCuTvCkLR4zB_3Fz6y1CRyVQfi6iC_ffzYOyEI5VgWOfc2kIs7uXY5CU3qB7uPMY4nLU-BWwu9GSwxPrnoq-vPJExovZuq1IewdguKANIz1cLJqy6kJxyOFCvdgvSZTqPFXD-plG0D7zp4dkHqm6EASJAyJgww5y5GA2DFmmpCt2IhJTPKmQ7sxy1p0cWgTHGadZZ4w4Sg*1676419311620*367e0d003e354b7b2918325039c50c4c9efeddfccbf2b83db1c323ddf1a9ac95*Wonveuv62pmHGo_BsUZSe97POlwdDN_MxQgZ7cAFnWY~2',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(this.configUrl, requestOptions)  
  }
}
