import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-carpetas',
  templateUrl: './card-carpetas.component.html',
  styleUrls: ['./card-carpetas.component.css']
})
export class CardCarpetasComponent implements OnInit {
  @Input() carpeta:any;

  @Input() idUsuario:any;

  @Output() Eventoborrar = new EventEmitter()
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  eliminar(modal){
    this.modalService.open(modal,{size:'sm'})
  }

  borrar(idCarpeta){
    this.Eventoborrar.emit(idCarpeta);
    console.log(idCarpeta)
    this.modalService.dismissAll()
  }

}
