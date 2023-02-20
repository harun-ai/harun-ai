import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  configUrl="https://harun-ai-api-stg.herokuapp.com/model"

  constructor(
    private http: HttpClient
  ) { }

  getListTemplate() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-HttpHeaders': 'Content-Type',
      'Authorization': 'Bearer Fe26.2*1*0737ad4d99c00f132e47f24488a1c5a49ed10608652da1e549e629ecd8e79cea*yH8mFv2G04sDGPMpuxJ4ww*OdnZQmpiGaZsRNVgay0jYp0UAUIKraVSfDAMXpw4ZZcOZNf3Iie4lmGv0Wb0G7Qdcq0hXuyjHpu9D3Mz8Ms_PLvkkRF-nyj4ePNT27hYL1luE_Z29PIkGa4A2cHSv5tL9OxcUE9hcADBnn2IMYYoIoi4E6FpYu1GgpERPXGheU9FSLiuOx9ITQg9C4tumtSxRwnhlw3EhVass3uJrTu7dE5Gt0nUMPuAZjLcT84yw06Z7ZOgVOvOGhvVFwQsuIT-Iw_p2w7gc8iQzLyLOdItJQ*1677000731703*40b333ecab04f3230604a266a4e134de82d5a330020bba7a57e8294769951c44*TzEj6MmnzeGiiMVyUrnomKM3-Q6RzFrPJqyZrevEunc~2',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(this.configUrl, requestOptions)  
  }
}
