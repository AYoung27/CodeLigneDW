import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-planespago',
  templateUrl: './planespago.component.html',
  styleUrls: ['./planespago.component.css']
})
export class PlanespagoComponent implements OnInit {
  url='http://localhost:8888/planes'
  urlUsuarios='http://localhost:8888/usuarios/'
  constructor(private httpClient:HttpClient,private router:Router,private route:ActivatedRoute) { }
  planes=[]
  idUsuario:any
  ngOnInit(): void {
    this.idUsuario=this.route.snapshot.paramMap.get('id');
    this.httpClient.get(this.url).subscribe((res:any)=>{
      this.planes=res
    })
  }

  seleccionarPlan(idPlan,ncarpetas,nproyectos,nsnippets){
    this.httpClient.put(this.urlUsuarios+this.idUsuario+'/planes',{idPlan:idPlan}).subscribe((res:any)=>{
      if(res.ok==1){
        this.router.navigate(['principal', {id:this.idUsuario}]);
        this.httpClient.put(this.urlUsuarios+this.idUsuario+'/valoresPlan',{nCarpetas:ncarpetas,nProyectos:nproyectos,nSnippets:nsnippets}).subscribe((res:any)=>{
      
        })
      }
    })
  }


}
