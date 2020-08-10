import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanespagoComponent } from './planespago.component';

describe('PlanespagoComponent', () => {
  let component: PlanespagoComponent;
  let fixture: ComponentFixture<PlanespagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanespagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanespagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
