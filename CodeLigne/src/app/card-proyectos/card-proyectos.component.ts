import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-proyectos',
  templateUrl: './card-proyectos.component.html',
  styleUrls: ['./card-proyectos.component.css']
})
export class CardProyectosComponent implements OnInit {
  @Input() proyecto:any

  @Input() idUsuario:any

  @Input() idCarpeta:any
  constructor() { }

  ngOnInit(): void {
  }

}
