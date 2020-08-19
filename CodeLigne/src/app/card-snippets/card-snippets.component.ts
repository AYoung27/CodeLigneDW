import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-card-snippets',
  templateUrl: './card-snippets.component.html',
  styleUrls: ['./card-snippets.component.css']
})
export class CardSnippetsComponent implements OnInit {

  @Input() snippet:any

  @Input() idUsuario:any

  constructor() { }

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
    }
  }

}
