import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  idUsuario:any;
  snippets=[]
  nuevo={
    nombreSnippet:'',
    descripcion:'',
    lenguaje:'',
    codigo:''
  }
  contadorSnippet:any
  constructor(private httpClient:HttpClient,private route:ActivatedRoute, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.idUsuario=this.route.snapshot.paramMap.get('id');
    this.httpClient.get(this.url+this.idUsuario+'/snippets').subscribe((res:any)=>{
      this.snippets=res.snippets
      this.contadorSnippet=res.nSnippets
    })
  }

  abrirModalSnippet(modal){
    this.modalService.open(modal,
      {
      size:'xs',
      centered:false
    })

  }

  nSnippet(){
    if(this.contadorSnippet>0 || this.contadorSnippet=='ilimitado'){
    this.httpClient.put(this.url+this.idUsuario+'/snippets',this.nuevo).subscribe((res:any)=>{
      if(res.ok==1){
        this.modalService.dismissAll();
        this.contadorSnippet--
        this.httpClient.put(this.url+this.idUsuario+'/actualizarSnippets',{nSnippets:this.contadorSnippet})
        this.ngOnInit();
      }
    })
    }
  }
}
