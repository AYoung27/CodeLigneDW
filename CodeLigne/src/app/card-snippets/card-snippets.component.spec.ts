import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSnippetsComponent } from './card-snippets.component';

describe('CardSnippetsComponent', () => {
  let component: CardSnippetsComponent;
  let fixture: ComponentFixture<CardSnippetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSnippetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
