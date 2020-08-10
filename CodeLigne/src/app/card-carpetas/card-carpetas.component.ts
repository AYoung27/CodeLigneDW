import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-carpetas',
  templateUrl: './card-carpetas.component.html',
  styleUrls: ['./card-carpetas.component.css']
})
export class CardCarpetasComponent implements OnInit {
  @Input() carpeta:any;

  @Input() idUsuario:any;
  constructor() { }

  ngOnInit(): void {
  }

}
