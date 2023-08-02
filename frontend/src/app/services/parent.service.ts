import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ParentService {
  /**
   * 
   * @param http used to make http requests to the backend
   */
  constructor(private http: HttpClient) { }


  // base url of the backend
  private baseUrl : string = 'http://localhost:8080/';


  // http://localhost:8080/page?currentPage=1&pageSize=2
  /**
   * 
   * @param page the page number to be fetched
   * @returns data of the parent and its children of the given page number
   */
  getPage(page: number){
    return this.http.get(this.baseUrl + 'page?currentPage=' + page + '&pageSize=2');
  }

  
  //	http://localhost:8080/child?id=1
  /**
   * 
   * @param id the id of the parent whose children are to be fetched
   * @returns data of the parent and its children of the given id
   */
  getChild(id: number){
    return this.http.get(this.baseUrl + 'child?id=' + id);
  }

}



