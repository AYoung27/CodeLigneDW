import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'
import { AuthService} from '../services/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  nombre:string;

  constructor(private httpClient:HttpClient,private route:ActivatedRoute,private auth:AuthService, private modalService:NgbModal) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(this.url+id).subscribe((res:any)=>{
      this.nombre=res.nombre+' '+res.apellido;
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
    console.log('modificar')
  }
}
