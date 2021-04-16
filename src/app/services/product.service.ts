import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiEndPoint = environment.URL;

  constructor(private http: HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiEndPoint}productmanagement/api/v1/all`) 
  }

  getProduct(productId:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiEndPoint}productmanagement/api/v1/${productId}/product`) 
  }
  

  create(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiEndPoint}productmanagement/api/v1/add`,product)
  }

  update(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiEndPoint}productmanagement/api/v1/update`,product)
  }

  delete(productId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiEndPoint}productmanagement/api/v1/${productId}/delete`);
  }


}
