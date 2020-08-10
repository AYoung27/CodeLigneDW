import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProyectosComponent } from './card-proyectos.component';

describe('CardProyectosComponent', () => {
  let component: CardProyectosComponent;
  let fixture: ComponentFixture<CardProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
