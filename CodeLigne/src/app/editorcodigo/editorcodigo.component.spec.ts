import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorcodigoComponent } from './editorcodigo.component';

describe('EditorcodigoComponent', () => {
  let component: EditorcodigoComponent;
  let fixture: ComponentFixture<EditorcodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorcodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorcodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
