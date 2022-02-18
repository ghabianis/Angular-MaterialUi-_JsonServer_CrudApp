import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url ='http://localhost:3000/productList/'
  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post<any>(`${this.url}`,data);
  }

 getProduct(){
    return this.http.get<any>(`${this.url}`);
  }

  DeleteProduct(id:any){
    return this.http.delete(`${this.url}`,id);
  }
}
