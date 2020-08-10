import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'




@Component({
  selector: 'app-editorcodigo',
  templateUrl: './editorcodigo.component.html',
  styleUrls: ['./editorcodigo.component.css']
})
export class EditorcodigoComponent implements OnInit {
  codeMirrorOptions: any ={
    lineNumbers:true,
    theme: 'material',
    mode: 'markdown'
  };
  url="http://localhost:8888/usuarios/";
  codigoHTML:string="";
  codigoJS: string="" ;
  codigoCSS:string="";
  contenido:string ="";
  idUsuario:any;
  idCarpeta:any;
  idProyecto:any;
  nombreProyecto:any;

  constructor(private doms : DomSanitizer,private httpClient:HttpClient, private route:ActivatedRoute) { }
  

  ngOnInit(): void {
    this.idUsuario=this.route.snapshot.paramMap.get('idUsuario');
    this.idCarpeta=this.route.snapshot.paramMap.get('idCarpeta');
    this.idProyecto=this.route.snapshot.paramMap.get('idProyecto');
    this.httpClient.get(this.url+this.idUsuario+'/carpetas/'+this.idCarpeta+'/proyectos/'+this.idProyecto).subscribe((res:any)=>{
        this.codigoHTML=res.codigoHtml;
        this.codigoCSS=res.codigoCss;
        this.codigoJS=res.codigoJs;
        this.nombreProyecto=res.nombreProyecto;
    })

  }

  ejecutar(){
    this.contenido="<style>"+this.codigoCSS+"</style><div>"+this.codigoHTML+"</div><script>"+this.codigoJS+"</script>";
  }

  guardar(){
    let codigo={
      codigoHtml:this.codigoHTML,
      codigoCss:this.codigoCSS,
      codigoJs:this.codigoJS
    }
    this.httpClient.put(this.url+this.idUsuario+'/carpetas/'+this.idCarpeta+'/proyectos/'+this.idProyecto,codigo).subscribe(res=>{
        console.log(res);
    })
  }

  limpiar(){
    this.codigoHTML='';
    this.codigoCSS='';
    this.codigoJS='';
  }
}
