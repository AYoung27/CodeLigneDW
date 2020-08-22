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
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.required)
  })
  constructor(private httpClient:HttpClient, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }

  get nombre(){
    return this.formRegistro.get('nombre')
  }
  get apellido(){
    return this.formRegistro.get('apellido')
  }
  get email(){
    return this.formRegistro.get('email')
  }
  get password(){
    return this.formRegistro.get('password')
  }

 registrarUsuario(){
    this.auth.registro(this.formRegistro.value).subscribe((res:any)=>{
        if(res.codigo==1){
          localStorage.setItem('token',res.token);
          this.router.navigate(['planes', {id:res.user}]);
        }else{
          alert(res.mensaje);
        }
    })
 }

}
