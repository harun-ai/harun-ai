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
      'Authorization': 'Bearer Fe26.2*1*327db715f465fb95c93b4cd6d226845cb52b8a7b8e85570b6947a313be908616*itHTVWpA2qFbGD6ZkW5C3g*N_tWHLXPdaRfVezRdpkqGgJSVR83Z3-3S1MG1zBRtXUY9LbwSgV5emPSgsNPFnt6PlTiNGKxEbjPDp2cbluN_Hd9mzMoxtyv581WLiCTCJZAVs8xugijhKQiF0HKb2z9Vmc6BqG1gBRfHzL0yIIpGAQI5gaCknQBfgN8m5dn296ewckYdJc-3rwKGDfeMn5c8FZ9tbU00ql_DizjqgS8Kji2tDyECbrIJCki-X2k0YrFF__K26r_0vz71m7iJ1okxsjJgoqKA6UZl-b3MsJM_g*1675292725214*d5a6c9b792d077ede45b65309c05afe8d54d58cb7defdd359e463d59c054f147*ut-tTmGzS9uLQAskDKUg8FcG_hGa6A8RSpR3kgN5wEQ~2',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(this.configUrl, requestOptions)  
  }
}
