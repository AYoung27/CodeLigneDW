import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:8888/usuarios/";
  constructor(private httpClient:HttpClient, private route:Router) { }


  login(user){
    return this.httpClient.post(this.url+"signIn",user);
  }

  registro(user){
    return this.httpClient.post(this.url+'signUp',user);
  }

  public logOut(){
    localStorage.removeItem('token');
    this.route.navigate(['/landingPage']);
  }

  loggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
