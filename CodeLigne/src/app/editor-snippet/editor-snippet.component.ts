import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-editor-snippet',
  templateUrl: './editor-snippet.component.html',
  styleUrls: ['./editor-snippet.component.css']
})
export class EditorSnippetComponent implements OnInit {
  url="http://localhost:8888/usuarios/";
  snippet={
    nombreSnippet:'',
    lenguaje:'',
    codigo:''
  }
  idUsuario:any
  idSnippet:any
  constructor(private httpClient:HttpClient, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario=this.route.snapshot.paramMap.get('id');
    this.idSnippet=this.route.snapshot.paramMap.get('idsnippet');
    this.httpClient.get(this.url+this.idUsuario+'/snippets/'+this.idSnippet).subscribe((res:any)=>{
      this.snippet.nombreSnippet=res.nombreSnippet;
      this.snippet.lenguaje=res.lenguaje;
      this.snippet.codigo=res.codigo;
    })
  }
  sintaxis(lenguaje){
    switch (lenguaje) {
      case 'php':
        return 'application/x-httpd-php'
      case 'python':
        return 'text/x-php'
      case 'perl':  
        return 'text/x-perl'
      case 'ruby':  
        return 'text/x-ruby'
      case 'c++':  
        return 'text/x-c++src'
      case 'otro':
        return 'text/x-markdown'
    }
  }
  guardar(){
    this.httpClient.put(this.url+this.idUsuario+'/snippets/'+this.idSnippet,{codigo:this.snippet.codigo}).subscribe((res:any)=>{
      if(res.ok==1){
        alert('codigo guardado')
      }
    })
  }

  limpiar(){
    this.snippet.codigo='';
  }

  cerrar(){
    this.router.navigate(['snippets',{id:this.idUsuario}]);
  }
}


