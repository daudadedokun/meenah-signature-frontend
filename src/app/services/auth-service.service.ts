import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiEndpoint = environment.URL

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService, private router:Router) { }

  public login(username:string, password:string){
    const headers= {'Content-Type':'application/json',};
    return this.http.post(this.apiEndpoint+"login",{username,password},{
      headers:headers,
      observe:'response',
      responseType: 'json'
    }).pipe(map((data:any)=>{
      
      let token = data.headers.get('authorization');
      if(token){
        const formattedToken = token.replace('Bearer ','')
        localStorage.setItem("token",formattedToken)
        return true
      }
      return false

    }))
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  isLoggedIn(){

    return this.jwtHelper.isTokenExpired();
  }

  get currentUser(){
    let token = this.jwtHelper.tokenGetter()
    
    if(!token)
      return null;
    
    return this.jwtHelper.decodeToken(token);
  }

  public register(user:User):Observable<User>{
     
    return this.http.post<User>(this.apiEndpoint+"api/register",user);
  }

}
