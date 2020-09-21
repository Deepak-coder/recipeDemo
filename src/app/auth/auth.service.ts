import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface AuthResponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localid:string,
  register?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }

  signup( email:string,password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALX6RlyQUXd9JbQrkT_0eae1OI2sUHmSk',
    {
      email:email,
      password:password,
      returnSercureToken:true
    })
  }

  signin(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALX6RlyQUXd9JbQrkT_0eae1OI2sUHmSk',
    {
      email:email,
      password:password,
      returnSercureToken:true
    })
  }
}
