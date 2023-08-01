import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private baseUrl : string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  // http://localhost:8080/page?currentPage=1&pageSize=2
  getPage(page: number){
    return this.http.get(this.baseUrl + 'page?currentPage=' + page + '&pageSize=2');
  }

  //	http://localhost:8080/child?id=1
  getChild(id: number){
    return this.http.get(this.baseUrl + 'child?id=' + id);
  }

}
