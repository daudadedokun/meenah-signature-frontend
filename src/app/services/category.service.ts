import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   private apiEndpoint = environment.URL

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiEndpoint+"productmanagement/api/v1/category/all");
  }
}
