import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  idUsuario:any;
  idCarpeta:any;
  proyectos=[];
  nuevo={
    nombreProyecto:'',
    descripcion:'',
    codigoHtml:'',
    codigoCss:'',
    codigoJs:''
  }
  contadorProyectos:any
  constructor(private httpClient:HttpClient,private route:ActivatedRoute, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.idUsuario=this.route.snapshot.paramMap.get('id');
    this.idCarpeta=this.route.snapshot.paramMap.get('idCarpeta');
    this.httpClient.get(this.url+this.idUsuario+'/carpetas/'+this.idCarpeta+'/proyectos').subscribe((res:any)=>{
        this.proyectos=res.proyectos;
    })
    this.httpClient.get(this.url+this.idUsuario+'/proyectosRestantes').subscribe((res:any)=>{
      this.contadorProyectos=res.nProyectos
    })
  }
  abrirModalProyecto(modal){
    this.modalService.open(modal,
      {
      size:'xs',
      centered:false
    })

  }

  nProyecto(){
    if(this.contadorProyectos>0||this.contadorProyectos=='ilimitado'){
      this.httpClient.put(this.url+this.idUsuario+'/carpetas/'+this.idCarpeta+'/proyectos',this.nuevo).subscribe((res:any)=>{
        if(res.ok==1){
          this.modalService.dismissAll();
          this.contadorProyectos--;
          console.log(this.contadorProyectos)
          this.httpClient.put(this.url+this.idUsuario+'/actualizarProyectos',{nProyectos:this.contadorProyectos}).subscribe((res:any)=>{})
          this.ngOnInit();
        }
      })
    }else{
      alert('Ha superado la cantidad de proyectos permitos')
    }
  }

}
