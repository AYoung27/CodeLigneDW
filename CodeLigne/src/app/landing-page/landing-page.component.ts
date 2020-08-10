import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  formRegistro = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private httpClient:HttpClient, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }

 registrarUsuario(){
    this.auth.registro(this.formRegistro.value).subscribe((res:any)=>{
        if(res.codigo==1){
          localStorage.setItem('token',res.token);
          this.router.navigate(['principal', res.user]);
        }else{
          console.log(res.mensaje);
        }
    })
 }

}
