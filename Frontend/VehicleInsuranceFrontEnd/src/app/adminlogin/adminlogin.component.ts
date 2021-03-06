import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {FormGroup,FormControl,Validators} from '@angular/forms';

import {LoginService} from '../services/loginService';

import { Router } from '@angular/router';
import { SharedService } from '../services/sharedService';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  admin:Admin;
  result;
  adminlogin:FormGroup;
  showError;
  public service;

  constructor(private loginService:LoginService,private routes:Router,private sharedService:SharedService)
  {
    this.service=sharedService;
    this.admin=new Admin();
    this.showError=false;
    this.adminlogin=new FormGroup({
      password:new FormControl(null,[Validators.required]),
     // email:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z 0-9 @ .]*')]),
      em:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z 0-9 @ .]*')]),
   // console.log(this.service.getuserData());
  })
  this.showError=false;
   }

   public get pd(){
    return this.adminlogin.get('password');
   }
 
   public get em(){
     return this.adminlogin.get('em');
   }


   adminLogin()
    {
      if(this.adminlogin.valid)
      {
        this.admin.Email=this.em.value;
        this.admin.Password=this.pd.value;

       this.loginService.adminlogin(this.admin).subscribe((data)=>
      {
          this.result=data;
          console.log(this.result);
          if(this.result!=null)
          {
            this.service.setadminEmail(this.result);
           
            this.routes.navigate(["/admindashboard"]);
          }


       })
       
    
      }
      if(this.result==null)
       {
        this.showError=true;
       }
    }
  


  ngOnInit(): void {
    this.service.setadminEmail(null);
    
  }

}
