import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  // configUrl="https://harun-ai-api-stg.herokuapp.com/model/0de728f2-1306-450a-b3a8-d67df56fa22e"
  configUrl = "https://harun-ai-api-stg.herokuapp.com/"

  constructor(
    private http: HttpClient
  ) { }

  getTemplateModel(idTemplate: string) {
    // idTemplate = '0de728f2-1306-450a-b3a8-d67df56fa22e';
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-HttpHeaders': 'Content-Type',
      'Authorization': 'Bearer Fe26.2*1*5c1bb34caa58227280b0603fd1dc7c9618f565b69a0a19ce5a4a63fb7d63b1aa*qGUFAmyoSc8BsUNaNswdAg*KPtwVvalVWKW3hOFNc5HFsppkPlw2D382c1ShMvyXSAsHDC0eiwWgxlj97A6keFtoWtfb4gmrRvmQNgLP6f-7SXV4FGIvppZKPWxz0tMEmGbQ7ka9q2daTCwwJKjN34UAAzH5zJBmGlRuo-_SkMZM_dgiiO4bvsLNvS3DARfGzJST8rfqtzLZBO_7ckk4rq3_F42u0V6CvtnurFchbfoIEotI1hdXby7my4CAqtlkbRN0eXyWBd8CId7ekjoCdVD6I6CGLOcdLcqXyLujfSaFA*1677802955385*90f67a36c9728b3e5406c7bfb49ec9fd95779154c2db228b00946d061b59d02f*BlZdbHt_ci38qYsHev8BNfjV6iqioOuUw8VTr-n78mk~2',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<any>(`${this.configUrl}model/${idTemplate}`, requestOptions)
  }
  postTemplateModel(idTemplate: string, payload: any) {
    // idTemplate = '0de728f2-1306-450a-b3a8-d67df56fa22e';
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-HttpHeaders': 'Content-Type',
      'Authorization': 'Bearer Fe26.2*1*5c1bb34caa58227280b0603fd1dc7c9618f565b69a0a19ce5a4a63fb7d63b1aa*qGUFAmyoSc8BsUNaNswdAg*KPtwVvalVWKW3hOFNc5HFsppkPlw2D382c1ShMvyXSAsHDC0eiwWgxlj97A6keFtoWtfb4gmrRvmQNgLP6f-7SXV4FGIvppZKPWxz0tMEmGbQ7ka9q2daTCwwJKjN34UAAzH5zJBmGlRuo-_SkMZM_dgiiO4bvsLNvS3DARfGzJST8rfqtzLZBO_7ckk4rq3_F42u0V6CvtnurFchbfoIEotI1hdXby7my4CAqtlkbRN0eXyWBd8CId7ekjoCdVD6I6CGLOcdLcqXyLujfSaFA*1677802955385*90f67a36c9728b3e5406c7bfb49ec9fd95779154c2db228b00946d061b59d02f*BlZdbHt_ci38qYsHev8BNfjV6iqioOuUw8VTr-n78mk~2',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    console.log('endpoint', `${this.configUrl}completion/${idTemplate}`);

    return this.http.post<any>(`${this.configUrl}model/completion/${idTemplate}`, payload, requestOptions)
  }

  postFeedback(payload: { predictionId: string, liked: boolean }) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-HttpHeaders': 'Content-Type',
      'Authorization': 'Bearer Fe26.2*1*5c1bb34caa58227280b0603fd1dc7c9618f565b69a0a19ce5a4a63fb7d63b1aa*qGUFAmyoSc8BsUNaNswdAg*KPtwVvalVWKW3hOFNc5HFsppkPlw2D382c1ShMvyXSAsHDC0eiwWgxlj97A6keFtoWtfb4gmrRvmQNgLP6f-7SXV4FGIvppZKPWxz0tMEmGbQ7ka9q2daTCwwJKjN34UAAzH5zJBmGlRuo-_SkMZM_dgiiO4bvsLNvS3DARfGzJST8rfqtzLZBO_7ckk4rq3_F42u0V6CvtnurFchbfoIEotI1hdXby7my4CAqtlkbRN0eXyWBd8CId7ekjoCdVD6I6CGLOcdLcqXyLujfSaFA*1677802955385*90f67a36c9728b3e5406c7bfb49ec9fd95779154c2db228b00946d061b59d02f*BlZdbHt_ci38qYsHev8BNfjV6iqioOuUw8VTr-n78mk~2',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<any>(`${this.configUrl}prediction/evaluate`, payload, requestOptions)

  }
}
