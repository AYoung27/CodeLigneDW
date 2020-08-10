import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarpetasComponent } from './card-carpetas.component';

describe('CardCarpetasComponent', () => {
  let component: CardCarpetasComponent;
  let fixture: ComponentFixture<CardCarpetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCarpetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCarpetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
