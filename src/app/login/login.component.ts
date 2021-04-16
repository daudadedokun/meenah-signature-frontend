
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin:boolean = false
  

  constructor(private authService: AuthServiceService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogin(loginForm:NgForm):any{    
    this.authService.login(loginForm.value.username,loginForm.value.password).subscribe((res)=>{
      if(res){
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl||'/'])

      }
        
    },(err:HttpErrorResponse)=>{
        if(err.status!==200)
          this.invalidLogin = true;
    }
    )
  }

  

}
