import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { DataStorageService } from '../shared/data-storage.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:boolean = false;
  message:string; 
  

  constructor(private authService:AuthService, private route:ActivatedRoute , private router :Router ,
     private dataStorage:DataStorageService , private notify : NotificationService) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm : NgForm){
   console.log(authForm.value,'this is the authForm value');

   if(!authForm.valid){
     return;
   }
   const email = authForm.value.email;
   const password = authForm.value.psw; 
    this.isLoading = true;
   if(this.isLoginMode){
      
      this.authService.signin(email,password).subscribe((resData:any) => {
        if(resData.registered == true){
           this.isLoading= false;  
           this.dataStorage.fetchRecipe().subscribe((response:any) =>{
             if(response){
               let recipes = response;
              localStorage.setItem('recipes',JSON.stringify(recipes));
              localStorage.setItem('login',JSON.stringify(true));
              this.notify.showSuccess('you are logging in...!!!');
              setTimeout(()=>{ 
               this.notify.showInfo('please wait.....')
               this.navigateTo();
             }, 2000);
                
             }
           });
           
        }
      }, err => {
       this.isLoading = false;
       this.error = true;
       this.message = err.error.error.message;
       console.log('this is the message' , this.message , err);
      }) 
   }
   else{
    this.authService.signup(email,password).subscribe(resData => {
      console.log('this is the response for signup',resData)
      this.isLoading = false;
     } , err => {
       this.isLoading = false;
       this.error = true;
       this.message = err.error.error.message;
       console.log('this is the message' , this.message , err);
     });
   }
   authForm.reset();
  }

   navigateTo(){
    this.router.navigate(['../recipes']);
   }
}
