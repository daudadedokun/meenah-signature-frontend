import { Product } from './../model/Product';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  

  create(product:Product, categoryId:number):Observable<Product>{
    return this.http.post<Product>(`${this.apiEndPoint}productmanagement/api/v1/${categoryId}/add`,product)
  }

  update(product:Product,categoryId:number):Observable<Product>{
    return this.http.put<Product>(`${this.apiEndPoint}productmanagement/api/v1/${categoryId}/update`,product)
  }

  delete(productId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiEndPoint}productmanagement/api/v1/${productId}/delete`);
  }

  uploadImage(productId:number, formData:any):Observable<any>{
    return this.http.post<any>(`${this.apiEndPoint}productmanagement/api/v1/${productId}/image/upload`,formData)
  }

  downloadImage(productId:number):Observable<any>{
    return this.http.get(`${this.apiEndPoint}productmanagement/api/v1/${productId}/image/download`)
  }



}
