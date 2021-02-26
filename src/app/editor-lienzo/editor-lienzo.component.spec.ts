import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLienzoComponent } from './editor-lienzo.component';

describe('EditorLienzoComponent', () => {
  let component: EditorLienzoComponent;
  let fixture: ComponentFixture<EditorLienzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorLienzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorLienzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
