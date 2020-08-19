import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSnippetComponent } from './editor-snippet.component';

describe('EditorSnippetComponent', () => {
  let component: EditorSnippetComponent;
  let fixture: ComponentFixture<EditorSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
