import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  nueva={
    nombreCarpeta:'',
    descripcion:'',
  };  
   id:any;
  url='http://localhost:8888/usuarios/';
  carpetas=[];
  contadorCarpetas:any;
  constructor(private httpClient:HttpClient,private router:Router,private route:ActivatedRoute,private modalService:NgbModal) { 
    
  }

  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.httpClient.get(this.url+this.id+'/carpetas').subscribe((res:any)=>{
      this.carpetas=res.carpetas;
      this.contadorCarpetas=res.nCarpetas;
      
    });
  }

  abrirModalCarpeta(modal){
    this.modalService.open(modal,
      {
      size:'xs',
      centered:false
    })

  }

  nCarpeta(){
    if(this.contadorCarpetas>0 || this.contadorCarpetas=='ilimitado'){
    this.httpClient.put(this.url+this.id,this.nueva).subscribe((res:any)=>{
      if(res.ok==1){
        this.modalService.dismissAll();
        this.contadorCarpetas--;
        this.httpClient.put(this.url+this.id+'/actualizarCarpetas',{nCarpetas:this.contadorCarpetas}).subscribe((res:any)=>{})
        this.ngOnInit();
      }
    })
    
  }else{
    alert('Has sobrepasado el numero de carpetas para tu plan');
    this.modalService.dismissAll()
  }
  }
  

}


