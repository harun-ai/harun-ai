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
      'Authorization': 'Bearer Fe26.2*1*f9b94d5ecfd717bac5d750b5f412af4e33347f9f983a81439ae3b7dddb74bd8c*7WHtM_n-NAdZ9fC5CmsaSA*iEwag7LGNvqIkJ093a4IGUOK-mXjG70EngHpV1c4vUx36wE05PpjLXnpYZLs-B1xfL0HqC0zPzmK2Nkndm8oTv0gKqIzriKgz6H5Icph1iZpAFtx1E4xP7DNqUT_lGs7BJM5moDJ7C_JtDFYcl_JzQwEmMH8kIDMwdnjUjScvkSYL0Qdfr8_G2rfgV4-hNrdUcuf00btStPC-kIr42clp0t6296EpYFy2kCAoxQ6leZKt6x-yP4XpLW4B5Trs55eR6Fi4pt1B60ashLwc_r9IQ*1676220188546*62e7a28e9727fa81753da9d392a88b7eb9fb28452beb8d5cf355067716106c97*8d9AxLQcpv16lhLPZoyFGik4TtFNPbs02lDG8QPP3C0~2',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(this.configUrl, requestOptions)  
  }
}
