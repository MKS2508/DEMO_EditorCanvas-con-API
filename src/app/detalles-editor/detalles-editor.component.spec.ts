import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEditorComponent } from './detalles-editor.component';

describe('DetallesEditorComponent', () => {
  let component: DetallesEditorComponent;
  let fixture: ComponentFixture<DetallesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
