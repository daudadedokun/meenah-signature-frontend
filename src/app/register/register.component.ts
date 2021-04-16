import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidReg:boolean = false

  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  public registerUser(registerForm:NgForm):any{
    return this.authService.register(registerForm.value).subscribe((res)=>{
      this.router.navigate(['/login'])      
    },(err:HttpErrorResponse)=>{
      this.invalidReg = true
      
    }
    )
  }

}
