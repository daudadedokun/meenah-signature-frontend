import {  CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthServiceService) { }
  canActivate() {
    let user = this.authService.currentUser
    if(user && user.authorities[0].authority === 'ADMIN')
      return true;

      this.router.navigate(['/no-access'])

      return false
  }
}
