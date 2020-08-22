import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'
import { AuthService} from '../services/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  perfil={
    nombre:'',
    apellido:'',
    email:''
  }
  password=new FormControl('',Validators.required)
  idUsuario:any
  constructor(private httpClient:HttpClient,private route:ActivatedRoute,private auth:AuthService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(this.url+this.idUsuario).subscribe((res:any)=>{
      this.perfil.nombre=res.nombre
      this.perfil.apellido=res.apellido
      this.perfil.email=res.email
    })
  }

  closeToggle(){
    document.querySelector('#sidebar-wrapper').classList.remove('sidebarOpen');
  }

  cerrarSesion(){
    this.auth.logOut();
  }

  abrirModal(modal){
    this.modalService.open(modal,
      {
        size:'md',
        centered:false
      }
      )
  }
  

  modificarPerfil(){
    this.httpClient.put(this.url+this.idUsuario+'/actualizarPerfil',this.perfil).subscribe((res:any)=>{
      if(res.ok==1){
        alert('usuario actualizado');
        this.modalService.dismissAll();
        this.ngOnInit()
      }
    })
  }
  modificarPass(){
    this.httpClient.put(this.url+this.idUsuario+'/cambiarPass',{password:this.password.value}).subscribe((res:any)=>{
      if(res.ok==1){
        alert('contraseña Actualizada');
        this.modalService.dismissAll
      }else{
        alert('no se pudo actualizar la contraseña')
      }
    })
  }


}
