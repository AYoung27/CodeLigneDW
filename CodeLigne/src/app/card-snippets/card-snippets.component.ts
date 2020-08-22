import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-snippets',
  templateUrl: './card-snippets.component.html',
  styleUrls: ['./card-snippets.component.css']
})
export class CardSnippetsComponent implements OnInit {

  @Input() snippet:any

  @Input() idUsuario:any

  @Output() eventoBorrarSnippet = new EventEmitter()
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  getColor(lenguaje) {
    switch (lenguaje) {
      case 'php':
        return 'purple';
      case 'python':
        return 'green';
      case 'ruby':
        return 'red';
      case 'perl':
        return 'blue';
      case 'cobol':
        return 'peru';
      case 'otro':
        return 'sandybrown'       
    }
  }

  eliminar(modal){
    this.modalService.open(modal,{size:'sm'})
  }

  borrar(idSnippet){
    this.eventoBorrarSnippet.emit(idSnippet);
    console.log(idSnippet)
    this.modalService.dismissAll()
  }
}
