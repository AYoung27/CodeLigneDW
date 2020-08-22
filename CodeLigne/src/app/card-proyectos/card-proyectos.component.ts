import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-proyectos',
  templateUrl: './card-proyectos.component.html',
  styleUrls: ['./card-proyectos.component.css']
})
export class CardProyectosComponent implements OnInit {
  @Input() proyecto:any

  @Input() idUsuario:any

  @Input() idCarpeta:any

  @Output() eventoBorrarProyecto = new EventEmitter()

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }


  eliminar(modal){
    this.modalService.open(modal,{size:'sm'})
  }

  borrar(idProyecto){
    this.eventoBorrarProyecto.emit(idProyecto);
    console.log(idProyecto)
    this.modalService.dismissAll()
  }
}
