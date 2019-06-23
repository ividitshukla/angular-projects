import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LiveSearchService {
  data: any;
  constructor(private http : HttpClient) { }

  getData() {
    this.data = this.http.get('http://www.mocky.io/v2/5ba8efb23100007200c2750c');
    return this.data;
  }

}
